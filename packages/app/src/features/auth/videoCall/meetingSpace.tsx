import { Send } from "lucide-react";
import Input from "../../../components/input";
import "./meetingSpace.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function MeetingSpace() {
  const [message, setMessage] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };
  // useEffect(() => {
  //   const socket = io('http://localhost:3600');

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className="meetingSpace">
      <div className="videoCall"></div>
      <div className="chatroom">
        <div className="chatMessages"></div>
        <div className="chatroomInput">
          <Input
            name="message"
            type="text"
            className="chatInput"
            value={message}
            onChange={handleChange}
            placeholder="Message"
          ></Input>
          <Send color="rgba(0, 186, 233, 0.750)" />
        </div>
      </div>
    </div>
  );
}

export default MeetingSpace;
