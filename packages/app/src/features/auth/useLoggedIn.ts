import { useData } from "../../context/dataContext";
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
function useLoggedIn() {
    const {loggedIn} = useData()
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedIn) {
        navigate("/");
        }
        
    }, [loggedIn]);
}


export default useLoggedIn;