import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../Context/UserContext.jsx"
import Food from "./Food.jsx"
import Header from "./Header.jsx";

export default function Track() {

    const loggedData = useContext(UserContext);

    const [foodItems, setFoodItems] = useState([]);

    const [food , setFood] = useState(null);

    const [searchAttempted, setSearchAttempted] = useState(false);

    function searchFood(event)
    {

        // console.log("Searching for:  ", event.target.value);

        if(event.target.value !== "") 
        {
            setSearchAttempted(true);

            fetch(`http://localhost:8000/foods/${event.target.value}`, {

            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
           })
           .then(response => response.json())
           .then(data => {

            if (data.message === undefined) 
                {
                    setFoodItems(data);
                } 

                else
                {
                    setFoodItems([]);
                }

               
           })
           .catch(error => {
               console.error("Error searching for food: ", error);
           })

        }
        else 
        {
            setFoodItems([]);
            setSearchAttempted(false);
        }

        

    }

   


    return(
        <>

        <section className="container  track-container">

            <Header />

            <div className="search">

                <input type="search" className="search-inp" onChange={searchFood} placeholder="Search for food items..." />

                {!food && (
                    foodItems.length !== 0 ?
                    (<div className="search-results">
                    {
                        foodItems.map((item) => {

                            return (
                                <p className="item" onClick={ ()=> {
                                    setFood(item);
                                }
                                    } key={item._id}>

                                        {item.name}

                                        </p>
                            )
                        })
                    }

                </div>)
                :
                (
                    searchAttempted ? (
                        <div className="search-results">
                            <p className="no-results">No food items found. Try searching with different keywords.</p>
                        </div>
                    ) : (
                        <div className="search-results">
                            <p className="search-prompt">Start typing to search for food items...</p>
                        </div>
                    )
                )

                )}


                

            </div>

         {
                food !== null ?(

                    <Food food={food} />
                    
                ):null
         }

            


            
        </section>
            
            
        </>
    )
}
