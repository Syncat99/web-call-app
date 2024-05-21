import { Send } from "lucide-react";
import Input from "../../../components/input";
import "./meetingSpace.css";
import { useState } from "react";


function MeetingSpace() {
    const [message, setMessage] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value);
    }
    console.log(message)
    return (
        <div className="meetingSpace">
        <div className="videoCall"></div>
        <div className="chatroom">
            <div className="chatMessages"></div>
            <div className="chatroomInput">
            <Input name="message" type="text" className="chatInput" value={message} onChange={handleChange} placeholder="Message"></Input>
            <Send color="rgba(0, 186, 233, 0.750)"/>
            </div>
        </div>
        </div>
    );
}


export default MeetingSpace;
