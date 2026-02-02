
const express = require ("express");
const mongoose = require ("mongoose");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");


const cors = require('cors');


// Models exports

const userModel = require ("./Models/userModels");

const foodModel = require ("./Models/foodModels");

const trackingModel = require ("./Models/trackingModels");


// middleware export

const verifyToken = require ("./verifyToken");









// Database Connection

mongoose.connect("mongodb://localhost:27017/NutrifyApp")
.then(() => {
    console.log("Database Connection Successfull")
})
.catch((err) => {
    console.log(err);
})




const app = express();

app.use(express.json());

app.use(cors());



// endpoint for Register

app.post("/register", (req, res) => {

    let user = req.body;


    bcrypt.genSalt(10, (err, salt) => {
        if(!err)
        {
            bcrypt.hash(user.password, salt, async (err, hpass) => {
                if(!err)
                {
                    user.password = hpass;

                    try
                    {
                        let doc = await userModel.create(user)
                        res.status(201).send({message:"User Registration Successfull"})
                    }
    
    
                    catch(err) {
                        console.log(err)
                        res.status(500).send({message: "Problem registering user"})
                    }                

                }
            })
        }
       
    })


    

})



// endpoint for login

app.post("/login", async (req, res) => {

    let userCredentials = req.body;


    try
    {

        let user = await userModel.findOne({email:userCredentials.email})

        if (user !== null)
        {

            bcrypt.compare(userCredentials.password,user.password, (err, success) => {

                if(success === true)
                {
                    jwt.sign({email:userCredentials.email}, "NutrifyApp", (err, token)  => {

                        if(!err)
                        {

                            res.send({message: "Login Successfull", token:token,})
                        }
                    })
                    
                }
                else
                {
                    res.status(403).send({message:"Incorrect password"})
                }
            } )
        }
        else
        {
            res.send({message: "Incorrect Email"})
        }
    }
    catch(err)
    {
        console.log(err)
        res.send({message: "Error Login In, try again!!!!"})
    }
    


})




// endpoint to search for all foods

app.get("/foods",verifyToken, async (req, res) => {


    try
    {
        let foods = await foodModel.find()
        res.send(foods)
    }
    catch(err)
    {
        console.log(err);
        res.send({message: "Error fetching foods"})
    }
    


})


// endpoint to search food by name

app.get("/foods/:name", verifyToken, async (req, res) => {

    try{

        let foods = await foodModel.find({name:{$regex: req.params.name, $options: "i"}})
        if(foods.length !== 0)
        {
            res.send(foods);
        }
        else
        {
            res.send({message: "Foods name not found or does not match????"})
        }

    }
    catch(err)
    {
        console.log(err);
        res.send({message: "Some problem fetching foods data"})
    }
})



// endpoint for adding food for user

app.post("/track", verifyToken, async (req, res) => {

    let trackData = req.body;

    try
    {

        let userData = await trackingModel.create(trackData);
        // console.log(userData)
        res.send({message: "User added"});
    }

    catch(err)
    {
        console.log(err);
        res.send({message: "Some problem fetching user data"})
    }
})



// endpoint to show tracked foods for User

app.get("/track/:userid/:date", verifyToken, async (req, res) => {

    let userid = req.params.userid;
    let date = new Date(req.params.date)

    let strDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    console.log (strDate, date)


    try
    {

        let foods = await trackingModel.find({userId:userid, eatenDate:strDate}).populate('userId').populate('foodId');
       
        res.send(foods)
    }

     catch(err)
    {
        console.log(err);
        res.send({message: "Some problem fetching foods for User"})
    }

})












app.listen(8000, () => {
    console.log("Server up and running");
})
