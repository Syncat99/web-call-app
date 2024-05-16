import Button from "../../../components/button";
import Input from "../../../components/input";
import Logo from "../../../components/logo";
import AuthLayout from "../layout";
import "./signup.css";
import { useState } from "react";
import axios from "axios"

export interface RegistrationProps {
    email: string;
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
}

function Registration() {
  const [userData, setUserData] = useState<RegistrationProps>({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserData(previous => ({
      ...previous,
      [name]: value
    }));
  }
  const register = async (data: RegistrationProps) => {
    if (userData.password !== userData.confirmPassword || userData.password === "" || userData.confirmPassword === "") {
      console.log("Re-enter password")
      return
    }
    else if (userData.email === "" || userData.username === "" || userData.name === "") {
      console.log("Please fill out all the fields")
      return
    }
    const res = await axios.post("http://localhost:3500/api/createUser", {
      username: data.username,
      email: data.email,
      name: data.name,
      password: data.password
    })
    console.log(res.data)
  }
  console.log(Object.values(userData))
  return (
    <AuthLayout className="signup">
      <Input
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
      />
      <Input
        name="name"
        placeholder="Full name"
        value={userData.name}
        onChange={handleChange}
      />
      <Input
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={userData.confirmPassword}
        onChange={handleChange}
      />
      <Button variant="purple" onClick={() => register(userData)}>Sign Up</Button>
    </AuthLayout>
  );
}

export default Registration;
