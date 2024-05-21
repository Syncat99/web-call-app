import { Link } from "react-router-dom";
import Input from "../../../components/input";
import Button from "../../../components/button";
import AuthLayout from "../layout";
import { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { useData } from "../../../context/dataContext";
import { useNavigate } from "react-router-dom";
import useLoggedIn from "../useLoggedIn";

export interface loginProps {
  username: string;
  password: string;
}

function Login() {
  const { loggedIn, setLoggedIn } = useData();
  const navigate = useNavigate();
  useLoggedIn();
  
  const [userData, setUserData] = useState<loginProps>({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   setLoggedIn(false);
  // }, [setLoggedIn]);

  const handleSubmit = async () => {
    try {
      const res = loggedIn;
      if (loggedIn) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (data: loginProps) => {
    try {
      const loginResult = await axios.post("http://localhost:3500/api/connect", {
        params: {
          username: data.username,
          password: data.password,
        },
      },{
        withCredentials:true,
      });
      if (loginResult.data.success) {
        setLoggedIn(true)
      }
    }
    catch (err) {
      console.log(err)
      setLoggedIn(false)
      setUserData((previous) => ({ ...previous, password: "" }))
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

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
      <Button
        type="submit"
        onClick={() => {
          login(userData);
          handleSubmit();
        }}
      >
        Log in
      </Button>
      <Link to="/register">
        <Button variant="purple">Sign Up</Button>
      </Link>
    </AuthLayout>
  );
}

export default Login;
