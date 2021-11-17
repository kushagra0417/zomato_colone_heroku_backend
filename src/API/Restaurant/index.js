// Libraries
import  express  from "express";



// Database model

import {RestaurantModel} from  "../../database/allModels"



// Validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";
import { ValidateId } from "../../validation/id";



const Router=express.Router();

/*
Route   /
Des     Get all the restaurant based on city
Params  none
Access  public 
Method post
*/
Router.get("/",async(req,res)=>{
    try {
        await ValidateRestaurantCity(req.query);
        const {city}=req.query;
        const restaurants=await RestaurantModel.find({city});
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

/*
Route   /
Des     Get individual restaurant deatils based on id
Params  id
Access  public 
Method post
*/

Router.get("/:_id",async(req,res)=>{
    try {

        await ValidateId(req.params);
        const {_id}=req.params;
        const restaurant=await RestaurantModel.findById(_id);
        if(!restaurant)
        return res.status(404).json({error:"Restaurant Not Found"})
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

/*
Route   /search
Des     Get individual restaurant deatils based on search string
Params  none
Body    searchString
Access  public 
Method post
*/

Router.get("/search",async(req,res)=>{
    try {
       await ValidateRestaurantSearchString(req.body);
        const {searchString}=req.body;
        const restaurant=await RestaurantModel.find({name:{
            $regex:searchString, $options:"i"},
        });
        if(!restaurant)
        return res.status(404).json({error:`No Restaurant matched with ${searchString}`})
        return res.json({restaurant});
        
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});


export default Router;