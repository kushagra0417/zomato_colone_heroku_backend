// Libraries
import  express  from "express";
import passport from "passport";



// Database model

import {OrderModel} from  "../../database/allModels"


//Validation 
import { ValidateId } from "../../validation/id";
import { ValidateOrderDetails } from "../../validation/order";

const Router=express.Router();

/*
Route   /order
Des     Get all orders based on id
Params   _id
Access  public
Method GET
*/

Router.get("/:_id", passport.authenticate("jwt", { session: false }),async(req,res)=>{
    try {
       await ValidateId(req.params);
        const { _id } = req.params;

      const getOrders = await OrderModel.findOne({ user: _id });

      if (!getOrders) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ orders: getOrders });
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

/*
Route   /new
Des     Add new order
Params   _id
Access  public 
Method  POST
*/
Router.post("/new/create",passport.authenticate("jwt"),async(req,res)=>{
    try {
        await ValidateId({_id:req.session.passport.user._doc._id.toString()});
        await ValidateOrderDetails(req.body);
        const {_id}=req.session.passport.user._doc;
        const {orderDetails}=req.body;

         const addNewOrder=await OrderModel.findOneAndUpdate({
             user:_id
         },{
             $push:{orderDetails},

         },{
             new:true
         });
        return res.json({order:addNewOrder})
         
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});




export default Router