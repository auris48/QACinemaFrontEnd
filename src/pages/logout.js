import { useContext } from "react"
// import { loginContext } from "../appContext/Context"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export const Logout = ({loggedIn ,setLoggedIn}) => {
    const navigate = useNavigate();
    // const {loggedIn, setLoggedIn} = useContext(loginContext);
    // console.log("LOGGEDIN:" + loggedIn);
    // console.log("CONTEXT:" + JSON.stringify(loginContext, null,  "  "));


    async function handleLogout(){
        try {
            const response = await fetch("http://localhost:3000/logout", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {
                    //   'Content-Type': 'application/json',
                    //   'cookie': '',
                      'accept': '*/*',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                // redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body data type must match "Content-Type" header
            })
            if (response.ok){
                setLoggedIn(false);
                navigate("/");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    

    return (<Link onClick ={handleLogout} className = 'link' to = "/logout">Log out</Link>);
    // return <p>Test</p>
}