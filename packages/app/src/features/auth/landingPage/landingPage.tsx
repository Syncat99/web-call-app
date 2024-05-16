import { useState } from "react";
import Button from "../../../components/button";
import "./landingPage.css"

function LandingPage() {
    return (
        <div className="main">
            <div className="main-nav">
                <div className="logo">LingoMingle</div>
                <div className="main-nav-buttons">
                    <Button className="mnb-1">Contact</Button>
                    <Button className="mnb-1">Login / Signup</Button>
                </div>
            </div>
            <div className="main-body">
                <div className="body-desc">
                    <div className="important">Learn with Strangers</div>
                    <div className="less-important">Meet and Learn with strangers who are learning the same language as you</div>
                    <Button className="join">Join Now !</Button>
                </div>
                <img className="main-img" width={"700px"} src="https://www.taggg.com/hubfs/Work-From-Home-Video-Conferencing-Setup.jpg"/>
            </div>
        </div>
    )
}


export default LandingPage;