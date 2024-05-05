import React from "react"
import { useState } from "react";
import "./styling/login.css"
import { Link } from "react-router-dom";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function OnChange(e) {
        if (e.target.name === "usernameIn") {
            setUsername(e.target.value);
        }
        else if (e.target.name === "passwordIn") {
            setPassword(e.target.value);
        }
    }

    return (
        <div className="authentication">
            <div className="auth-login">
                <h1 className="logo">WCA</h1>
                <input type="text" name="usernameIn" placeholder="Username" value={username} onChange={OnChange}/>
                <input type="password" name="passwordIn" placeholder="Password" value={password} onChange={OnChange}/>
                <button type="submit">Log in</button>
            </div>
            <div className="auth-registration">
                <Link to="/register"><button>Sign Up</button></Link>
            </div>
        </div>
    );
  }
  
  export default Login;
  