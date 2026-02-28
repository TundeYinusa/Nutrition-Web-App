
import { Link } from "react-router-dom"

export default function Notfound() {
    

    return(
        <div className="container">
            
           <h1 className="not-found">404 Error!! Not Found  <p> <Link to="/register" className="link">Click to register here</Link></p></h1> 
        </div>
    )
}