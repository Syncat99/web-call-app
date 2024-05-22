import "./meetingspace.css";

import Input from "../../components/input";
import { Send } from "lucide-react";
import { useState } from "react";
import PeerJs from "peerjs";

function MeetingSpace() {
  const [message, setMessage] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

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
          />
          <Send color="rgba(0, 186, 233, 0.750)" />
        </div>
      </div>
    </div>
  );
}

export default MeetingSpace;
