import { useNavigate } from "react-router-dom";
import { useData } from "../../context/dataContext";
import Footer from "../../features/auth/footer/footer";
import Navbar from "../../features/auth/navbar/navbar";
import MeetingSpace from "../../features/auth/videoCall/meetingSpace";
import useLoggedIn from "../../features/auth/useLoggedIn";
import { useEffect } from "react";



function MainApp() {
    const {loggedIn} = useData()
    const navigate = useNavigate()
    useEffect(() => {
        if (!loggedIn) {
        navigate("/");
        }
        
    }, [loggedIn]);
    return (
        <>
            <Navbar />
            <MeetingSpace />
            <Footer />
        </>
    )
}

export default MainApp;