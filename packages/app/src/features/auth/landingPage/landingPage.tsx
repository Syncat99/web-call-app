import { useState } from "react";
import Button from "../../../components/button";
import "./landingPage.css";
import { Link } from "react-router-dom";
import { useData } from "../../../context/dataContext";

function LandingPage() {
  const { loggedIn } = useData();
  return (
    <div className="main">
      <div className="main-nav">
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
      <div className="main-body">
        <div className="body-desc">
          <div className="important">Learn with Strangers</div>
          <div className="less-important">
            Meet and Learn with strangers who are learning the same language as
            you
          </div>
          <Link to="/register">
            {!loggedIn && <Button className="join">Join Now !</Button>}
          </Link>
          <Link to="/app">
            {loggedIn && <Button className="start">Start !</Button>}
          </Link>
        </div>
        <img
          className="main-img"
          width={"700px"}
          src="https://www.taggg.com/hubfs/Work-From-Home-Video-Conferencing-Setup.jpg"
        />
      </div>
    </div>
  );
}

export default LandingPage;
