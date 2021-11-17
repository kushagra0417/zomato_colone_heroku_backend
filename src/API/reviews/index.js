// Libraries
import  express  from "express";
import passport from  "passport";


// Database model

import {ReviewModel} from  "../../database/allModels"


// Validation 
import { ValidateId } from "../../validation/id";

const Router=express.Router();

/*
Route     /
Des       Get all review
Params    resid
BODY      none
Access    Public
Method    GET  
*/
Router.get("/:resid", async (req, res) => {
    try {
      const reviews = await ReviewModel.find({ restaurant: req.params.resid });
      return res.json({ reviews });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });



/*
Route    /new
Des      Add new review/ratting
Params   none
BODY     review object
Access   public 
Method   GET
*/
Router.post("/new",passport.authenticate("jwt"),async(req,res)=>{
    try {
       
      const {_id}=req.session.passport.user._doc;
        const {reviewData}=req.body;
        await ReviewModel.create({...reviewData,user:_id});
        return res.json({review:"Sucessfully Created Review"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});

/*
Route    /delete
Des      delte review/ratting
Params   _id
BODY     none
Access   public 
Method   DELETE
*/
Router.delete("/delete/:_id",async(req,res)=>{
    try {

        await ValidateId(req.params);
        const {_id}=req.params

        await ReviewModel.findByIdAndDelete(_id);

        return res.json({review:"Sucessfully Deleted Review"})

    } catch (error) {
         return res.status(500).json({error:error.message})
    }
});


export default Router;