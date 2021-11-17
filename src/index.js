//Importing Env Variables
require ("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";

//config 
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

// microservices route
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant"
import Food from "./API/Food"
import Menu from "./API/Menu"
import Image from "./API/Image"
import Order from "./API/orders"
import Reviews from "./API/reviews"
import User from "./API/User"
import Payments from "./API/Payments"

// Database connection 
import ConnectDB from "./database/connection";

const zomato=express();

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(session({secret: "secret",

    resave: true,
    saveUninitialized: true
}));
zomato.use(passport.session());

// passport configuration
 
googleAuthConfig(passport);
routeConfig(passport);

// Application Route
zomato.use("/auth",Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);
zomato.use("/image",Image);
zomato.use("/order",Order);
zomato.use("/reviews",Reviews);
zomato.use("/user",User);
zomato.use("/payments",Payments)

zomato.get("/",(req,res)=>{
    res.json({message:"setup success"})
});


zomato.listen(process.env.PORT || 5000 ,()=>ConnectDB().then(()=>console.log("server is running")).catch(()=>console.log("server is running but database connection failed...")));