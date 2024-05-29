import "./meetingspace.css";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useData } from "../../context/dataContext";
import { useEffect, useRef, useState } from "react";
import { useUserMedia } from "./useUserMedia";
import Button from "../../components/button";
import Input from "../../components/input";
import { Send } from "lucide-react";
import PeerJs from "peerjs";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3500/api/waiting",
  withCredentials: true,
});

/// /success
// /join

function MeetingSpace() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { stream, enableStream } = useUserMedia();
  const callerRef = useRef<HTMLVideoElement>(null);
  const calleeRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (callerRef.current && !!stream) {
      callerRef.current.srcObject = stream;
      callerRef.current.play();
    }
  }, [callerRef.current, !!stream]);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([
    { message: "Hello world", isSender: false },
    {
      message: "Hello world",
      isSender: true,
    },
  ]);
  const [remotePeerId, setRemotePeerId] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const { data } = useData();

  const peerId = data?.id;
  const [peer, setPeer] = useState<PeerJs | null>(null);
  const [conn, setConn] = useState<any | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const mapMessages = () =>
    messages.map(({ message, isSender }, index) => (
      <div>
        <p
          className={`chatMessage ${isSender && "chatMessage-sender"}`}
          key={index}
        >
          {`<${isSender ? "You" : "Remote"}>`} {message}
        </p>
      </div>
    ));

  const handleCheckStatus = async () => {
    if (checkingStatus) return;
    setCheckingStatus(true);

    const { data } = await api.get("/status");
    if (data.status !== "success" && data.status !== "calling")
      setTimeout(handleCheckStatus, 500);

    if (data.status === "calling" || data.status === "success")
      setRemotePeerId(data.peerId);

    setCheckingStatus(false);
  };

  const handleSend = async () => {
    if (!message) return;
    // conn.send(message);
    setMessages((prev) => [...prev, { message, isSender: true }]);
    setMessage("");
  };

  useEffect(() => {
    console.log(remotePeerId);
    if (!remotePeerId || !stream || !data) return;
    if (peer) peer.destroy();

    const newPeer = new PeerJs(peerId, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
      config: { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
    });

    const conn = newPeer.connect(remotePeerId);

    setPeer(newPeer);
    setConn(conn);

    conn.on("open", () => {
      console.log("connection open");
      conn.send("hello");
    });

    // conn.on("data", (data: string) => {
    //   console.log("Received", data);
    //   setMessages((prev) => [...prev, data]);
    // });

    newPeer
      .call(remotePeerId, stream, { metadata: { peerId } })
      .on("stream", (remoteStream) => {
        if (calleeRef.current) {
          if (calleeRef.current.srcObject) return;
          calleeRef.current.srcObject = remoteStream;
          calleeRef.current.play();
        }
      });

    newPeer.on("call", (call) => {
      if (call.peer === remotePeerId) call.answer(stream);
    });

    return () => {
      newPeer.destroy();
    };
  }, [remotePeerId, peerId, stream, data]);

  const handleConnect = async () => {
    const language = searchParams.get("language");
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
      <div className="videoCallContainer">
        <div className="videoCall">
          <video ref={calleeRef}></video>

          <div className="currentUserCall">
            <video ref={callerRef}></video>
          </div>
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
          <Send onClick={handleSend} color="rgba(0, 186, 233, 0.750)" />
        </div>
      </div>
    </div>
  );
}

export default MeetingSpace;
