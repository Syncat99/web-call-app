import "./meetingspace.css";

import Input from "../../components/input";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PeerJs from "peerjs";
import { useUserMedia } from "./useUserMedia";
import Button from "../../components/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3500/api/waiting",
  withCredentials: true,
});

/// /success
// /join

function MeetingSpace() {
  const { language } = useParams();
  const navigate = useNavigate();

  const { stream, enableStream } = useUserMedia();
  const currentRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (currentRef.current && stream) {
      currentRef.current.srcObject = stream;
      currentRef.current.play();
    }
  }, [currentRef.current, stream]);

  const [peerId, setPeerId] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [remotePeerId, setRemotePeerId] = useState<string>("");

  useEffect(() => {
    const peer = new PeerJs();
    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data: string) => setMessages((prev) => [...prev, data]));
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const mapMessages = () =>
    messages.map((message, index) => (
      <p className="chatMessage" key={index}>
        {message}
      </p>
    ));

  const handleCheckStatus = async () => {
    const { data } = await api.get("/status");
    if (data.status !== "success" && data.status !== "calling")
      setInterval(handleCheckStatus, 500);
  };

  const handleConnect = async () => {
    if (!language) return navigate("/");

    await enableStream();

    const { data } = await api.post("/join", {
      language,
      peerId,
    });

    if (data.status === "success") setRemotePeerId(data.peer.peerId);
    else handleCheckStatus();
  };

  return (
    <div className="meetingSpace">
      <div className="videoCall">
        <div className="currentUserCall">
          <video ref={currentRef}></video>
        </div>
        <Button onClick={handleConnect}>Connect with camera</Button>
      </div>
      <div className="chatroom">
        <div className="chatMessages">{mapMessages()}</div>
        <div className="chatroomInput">
          <Input
            name="message"
            type="text"
            className="chatInput"
            value={message}
            onChange={handleChange}
            placeholder="Message"
          />
          <Send color="rgba(0, 186, 233, 0.750)" />
        </div>
      </div>
    </div>
  );
}

export default MeetingSpace;
