import { Link } from "react-router-dom";
import Input from "../../../components/input";
import Button from "../../../components/button";
import AuthLayout from "../layout";
import { useState } from "react";
import "./login.css";

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });

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
          name="usernameIn"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="passwordIn"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
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
