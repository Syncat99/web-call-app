import { Link } from "react-router-dom";
import Input from "../../../components/input";
import Button from "../../../components/button";
import AuthLayout from "../layout";
import { useState } from "react";
import "./login.css";
import axios from "axios";

export interface loginProps {
  username: string;
  password: string;
}

function Login() {
  const [userData, setUserData] = useState<loginProps>({
    username: "",
    password: ""
  });
  console.log(userData.username)
  const login = async (data: loginProps) => {
    const loginResult = await axios.post("http://localhost:3500/api/connect", {
      params: {
        username: data.username,
        password: data.password
      }})
    console.log(loginResult.data)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserData(previous => ({
      ...previous,
      [name]: value
    }));
  }
  
    return (
    <div className="login">
      <AuthLayout>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <Button type="submit" onClick={() => {login(userData)}}>Log in</Button>
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
