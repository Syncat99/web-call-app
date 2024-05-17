import { Link } from "react-router-dom";
import Input from "../../../components/input";
import Button from "../../../components/button";
import AuthLayout from "../layout";
import { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useData } from "../../../context/dataContext";

export interface loginProps {
  username: string;
  password: string;
}

function Login() {
  const [userData, setUserData] = useState<loginProps>({
    username: "",
    password: ""
  });
  const {loggedIn, setLoggedIn} = useData()

  useEffect(() => {
    setLoggedIn(false);
  }, [setLoggedIn]);

  const login = async (data: loginProps) => {
    const loginResult = await axios.post("http://localhost:3500/api/connect", {
      params: {
        username: data.username,
        password: data.password
      }})
    if ((loginResult.data) === "correct") {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false);
      setUserData(previous => ({...previous, password: ""}))
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserData(previous => ({
      ...previous,
      [name]: value
    }));
  }
  
    return (
      <AuthLayout className="loginForm">
        <Input
          className="login"
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
        />
        <Input
          className="login"
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <Button type="submit" onClick={() => {login(userData)}}>Log in</Button>
        <Link to="/register">
          <Button variant="purple">Sign Up</Button>
        </Link>
      </AuthLayout>
        
  );
}

export default Login;
