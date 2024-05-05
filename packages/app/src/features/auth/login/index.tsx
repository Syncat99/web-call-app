import { Link } from "react-router-dom";
import Input from "../../../components/input";
import Button from "../../../components/button";
import AuthLayout from "../layout";
import { useState } from "react";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <AuthLayout>
        <Input
          type="text"
          name="usernameIn"
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <Input
          type="password"
          name="passwordIn"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <Button type="submit">Log in</Button>
      </AuthLayout>
      <div className="auth-registration">
        <Link to="/register">
          <Button variant="purple">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
