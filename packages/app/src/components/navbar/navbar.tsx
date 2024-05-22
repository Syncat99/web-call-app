import { useState } from "react";
import Button from "../button";
import { useData } from "../../context/dataContext";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  const { loggedIn } = useData();
  return (
    <div className="nav">
      <div className="logo">LingoMingle</div>
      {!loggedIn && (
        <div className="main-nav-buttons">
          <Button className="mnb-1">Contact</Button>
          <Link to="/login">
            <Button className="mnb-1">Login / Signup</Button>
          </Link>
        </div>
      )}
      {loggedIn && <Button className="mnb-1">Profile</Button>}
    </div>
  );
}

export default Navbar;
