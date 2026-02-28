import { useEffect, useState, useContext } from "react"
import { UserContext } from "../Context/UserContext"
import Header from "./Header";




export default function Diet()
{

    let loggedData = useContext(UserContext);

    const [items , setItems] = useState([]);

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    

    let [total, setTotal] = useState({
        totalProtein: 0,
        totalCarbohydrates: 0,
        totalFat: 0,
        totalFiber: 0,
        totalCalories: 0
    })

    useEffect(() => {

        const apiDate = formatDateForApi(date);

        fetch(`http://localhost:8000/track/${loggedData.loggedUser.userid}/${apiDate}`, {


            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
           })
              .then((response) => response.json())
                .then(data => {
                    console.log("Diet data for date", apiDate, data);
                    if(data && data.length > 0) {
                        setItems(data);
                    } else {
                        console.log("No data found for date: ", apiDate);
                        setItems([]);
                    }
                })
                .catch((error) => {
                    console.log("Error fetching diet data: ", error);
                    setItems([]);
                })

    }, [date])

    useEffect(() => {
        calculateTotal();
    }, [items]) 


    function calculateTotal()
    {
        let totalCopy = {
            totalProtein: 0,
            totalCarbohydrates: 0,
            totalFat: 0,
            totalFiber: 0,
            totalCalories: 0
        };

        items.forEach(item => {
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalCarbohydrates += item.details.carbohydrates;
            totalCopy.totalFat += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;
            totalCopy.totalCalories += item.details.calories;
        });

        setTotal(totalCopy);
    }

    function formatDateForApi(isoDate)
    {
        if(!isoDate) return isoDate;
        const [year, month, day] = isoDate.split('-');
        return `${month}-${day}-${year}`;
        
    }

    function formatDateDisplay(isoDate)
    {
        if(!isoDate) return '';
        const dateObj = new Date(isoDate + 'T00:00:00');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }

    return( 
        
        <section className="container diet-container">

            <Header/>

            <input type="date" className="date"  onChange={(event) => {
                setDate(event.target.value)
            }}/>

            <h3 className="date-display">{formatDateDisplay(date)}</h3>

            {
                items.length > 0 ? (
                items.map((item) => {

                    return(
                    <div className="item" key={item._id}>

                        <h2>{item.foodId.name} ({item.details.calories}Kcal for {item.quantity}g)</h2>

                        <p> protein: {item.details.protein}g,
                        carbs: {item.details.carbohydrates}g,
                        fat: {item.details.fat}g,
                        fiber: {item.details.fiber}g
                        
                        </p>

                    </div>
                )
                })                ) : (
                    <div className="item">
                        <p>No food data found for this date. Please select another date or add some food entries.</p>
                    </div>
                )            }

            <div className="item">
                <h2>Total: {total.totalCalories}Kcal</h2>
                <p>Protein: {total.totalProtein}g, Carbs: {total.totalCarbohydrates}g, Fat: {total.totalFat}g, Fiber: {total.totalFiber}g</p>
            </div>




        </section>
    )
}