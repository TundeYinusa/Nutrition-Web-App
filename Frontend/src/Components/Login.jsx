
import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext.jsx"




export default function Login() {

    const loggedData = useContext(UserContext);


    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    })


    const [message, setMessage] = useState({
        type: "invisible-msg",
        content: "Dummy"
    })



    function handleInput(event) {

        setLoginDetails((prevDetails) => {
            return {
                ...prevDetails,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        // console.log("Login Details Submitted: ", loginDetails);


        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(loginDetails)
        })
        .then((response) => {

            if(response.status === 404) {
                setMessage({
                    type: "error",
                    content: "Email dosen't exist. Please register first."
                })
            }

            else if(response.status === 403) {
                setMessage({
                    type: "error",
                    content: "Incorrect password."
                })
            }

            setTimeout(() => {
                setMessage({
                    type: "invisible-msg",
                    content: ""
                })
            }, 3000);

            return response.json()

            

        })
        .then((data) => {
            
            if(data.token !== undefined) {
            localStorage.setItem("Nutrify-User", JSON.stringify(data));

            loggedData.setLoggedUser(data);

            navigate("/track");

            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (

        <section className="container">
            

            <form className="form" onSubmit={handleSubmit}>

                <h1>Login To Fitness</h1>

                <input type="email" name="email" required placeholder="Enter your email" className="inp" value={loginDetails.email} onChange={handleInput} />

                <input type="password" name="password" required placeholder="Enter your password" className="inp" value={loginDetails.password} onChange={handleInput} />

                <button type="submit" className="btn">Login</button>

                <p > Not Registered ? <Link to="/register" className="link">Create Account</Link></p>

                <p className={message.type}>{message.content}</p>


            </form>
        </section>
    )
}