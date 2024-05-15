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
  const sign = async (data: RegistrationProps) => {
    const res = await axios.post("http://localhost:3500/api/createUser", data)
    console.log(res.data)
  }
  console.log("email "+userData.email)
  console.log("name "+userData.name)
  console.log("username "+userData.username)
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
      <Button variant="purple" onClick={() => sign(userData)}>Sign Up</Button>
    </AuthLayout>
  );
}

export default Registration;
