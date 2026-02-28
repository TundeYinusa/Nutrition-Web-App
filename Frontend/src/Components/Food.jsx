
import { use, useEffect, useState } from "react"

import { useContext } from "react"
import { UserContext } from "../Context/UserContext.jsx"


export default function Food(props) 
{

    const [eatenQuantity, setEatenQuantity] = useState(100);

    const [food, setFood] = useState({}); 

    const [foodInitial, setFoodInitial] = useState({});

    let loggedData = useContext(UserContext); 





    useEffect(() => {
 
        setFood(props.food);
        setFoodInitial(props.food);


    }, [props.food]) 

    

    function CalculateGrams(event)
    {


        if (event.target.value.length !== 0)
        {

            let quantity = Number(event.target.value);

            setEatenQuantity(quantity);


            let copyFood = {...food};

        copyFood.protein = (foodInitial.protein * quantity) / 100;
        copyFood.carbohydrates = (foodInitial.carbohydrates * quantity) / 100;
        copyFood.fat = (foodInitial.fat * quantity) / 100;
        copyFood.fiber = (foodInitial.fiber * quantity) / 100;
        copyFood.calories = (foodInitial.calories * quantity) / 100;

        setFood(copyFood);
        }

        
         
    }


     function trackFoodItem()
     {
        let trackedItem = {
            userId: loggedData.loggedUser.userid,
            foodId: food._id,
            details: {
                protein:food.protein,
                carbohydrates:food.carbohydrates,
                fat:food.fat,
                fiber:food.fiber,
                calories:food.calories 
            },
            quantity: eatenQuantity
        }

        console.log("Tracking food item: ", trackedItem);

        fetch("http://localhost:8000/track", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trackedItem)
        })
        .then((response) => response.json())
        .then(data => {
            console.log("Tracking response:", data);
        })
        .catch((error) => {
            console.log("Error tracking food item:", error);
        });
    }


    return(

        <div className="food">

                <div className="food-img">
                    <img className="food-image" src={food.imageUrl} alt={food.name} />

                </div>

                <h3>{food.name} ({food.calories} KCal for {eatenQuantity}g)</h3>

                <div className="nutrient">

                    <p className="n-title">Protein</p>
                    <p className="n-value">{food.protein}g</p>

                </div>

                <div className="nutrient">

                    <p className="n-title">Carbohydrate</p>
                    <p className="n-value">{food.carbohydrates}g</p>

                </div>

                <div className="nutrient">

                    <p className="n-title">Fat</p>
                    <p className="n-value">{food.fat}g</p>

                </div>

                <div className="nutrient">

                    <p className="n-title">Fibre</p>
                    <p className="n-value">{food.fiber}g</p>

                </div>

                <div className="track-control">

                    <input type="number" className="inp" placeholder="Enter quantity grams (Gms)" onChange={CalculateGrams} />

                

                     <button className="btn" onClick={trackFoodItem}> Track </button>

                </div>

                

            </div>
    )
}