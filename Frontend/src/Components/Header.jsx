
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx"
import { useNavigate, Link } from "react-router-dom";



export default function Header()
{

    const loggedData = useContext(UserContext);

    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("Nutrify-User");
        loggedData.setLoggedUser(null);
        navigate("/login");

    }


    return(

        <div className="heading">

            <ul>
                <li><Link to="/track">Track</Link></li>
                <li><Link to="/diet">Diet</Link></li>
                <li><button className="btn header" onClick={logout}>Logout</button></li>
            </ul>

        </div>

    )
}