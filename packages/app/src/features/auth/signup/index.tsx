import Button from "../../../components/button";
import Input from "../../../components/input";
import Logo from "../../../components/logo";
import AuthLayout from "../layout";
import "./signup.css";
import { useState } from "react";

function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout className="signup">
      <Input
        name="email"
        placeholder="Email"
        value={email}
        setValue={setEmail}
      />
      <Input
        name="name"
        placeholder="Full name"
        value={name}
        setValue={setName}
      />
      <Input
        name="username"
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        setValue={setPassword}
      />
      <Button variant="purple">Sign Up</Button>
    </AuthLayout>
  );
}

export default Registration;
