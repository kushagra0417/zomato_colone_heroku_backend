// Libraries
import  express  from "express";



// Database model

import {FoodModel} from  "../../database/allModels"



// Validation
import { Validatecategory, ValidateRestaurantId } from "../../validation/food";


const Router=express.Router();

/*
Route   /r
Des     Get all food based on particular restaurant
Params   _id
Access  public 
Method GET
*/

Router.get("/r/:_id",async(req,res)=>{
try {
     await ValidateRestaurantId(req.params);

    const {_id}=req.params;
    const foods=await FoodModel.find({restaurant:_id});
    return res.json({foods})
} catch (error) {
    return res.status(500).json({error:error.message})
}
});

/*
Route   /:_id
Des     Get food based on id
Params   _id
Access  public 
Method GET
*/

Router.get("/:_id",async(req,res)=>{
    try {
         await ValidateRestaurantId(req.params);
    
        const {_id}=req.params;
        const foods=await FoodModel.findById(_id);
        return res.json({foods})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
    });

/*
Route   /c
Des     Get all food based on particular category
Params   category
Access  public 
Method GET
*/

Router.get("/c/:category",async(req,res)=>{

    try {
        await Validatecategory(req.params);
        const {category}=req.params;
        const foods=await FoodModel.find({category:{$regex:category,Options:"i"}});
        return res.json({foods})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})



export default Router;