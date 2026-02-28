
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Register() {

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    })

    const [message, setMessage] = useState({
        type: "invisible-msg",
        content: "Dummy"
    })

    function handleInput(event) {

        // console.log(event.target.name, event.target.value)

        setUserDetails((prevDetails) => {
            return {
                ...prevDetails,
                [event.target.name]: event.target.value

                
            }

        
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("User Details Submitted: ", userDetails);


        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(userDetails)
        })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            setMessage({
                type: "success",
                content: data.message
            })

            setUserDetails({
                name: "",
                email: "",
                password: "",
                age: ""
    })

    setTimeout(() => {
        setMessage({
            type: "invisible-msg",
            content: "Dummy"
        })
    }, 3000);
        
    })
    .catch((err) => {
        console.log(err);
    })

    }

    
    return (

        <section className="container">
            

            <form className="form" onSubmit={handleSubmit} >

                <h1>Join us For Fitness</h1>

                <input type="text" name="name" required placeholder="Enter your name" className="inp" value={userDetails.name} onChange={handleInput} />

                <input type="email" name="email" required placeholder="Enter your email" className="inp" value={userDetails.email} onChange={handleInput} />

                <input type="password" name="password" required placeholder="Enter your password" className="inp" value={userDetails.password} onChange={handleInput} />
                
                <input type="number" name="age" max={100} min={10} required placeholder="Enter your age" className="inp" value={userDetails.age} onChange={handleInput} />

                <button type="submit" className="btn">Register</button>

                <p> Already Registered ? <Link to="/login" className="link">Login</Link></p>

                <p className={message.type}>{message.content}</p>


            </form>
        </section>
    )
}