import React from "react";
import { useState } from "react";
import "./styling/registration.css"

function Registration() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function OnChange(e) {
        if (e.target.name === "username") {
            setUsername(e.target.value);
        }
        else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
        else if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        else if (e.target.name === "name") {
            setName(e.target.value);
        }
    }

    return (
        <div className="registration">
            <h1 className="logo">WCA</h1>
            <input name="email" placeholder="Email" value={email} onChange={OnChange}/>
            <input name="name" placeholder="Full name" value={name} onChange={OnChange}/>
            <input name="username" placeholder="Username" value={username} onChange={OnChange}/>
            <input name="password" placeholder="Password" value={password} onChange={OnChange}/>
            <button>Sign Up</button>
        </div>
    );
  }
  
  export default Registration;