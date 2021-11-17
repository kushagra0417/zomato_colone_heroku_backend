import joi from "joi";


export const ValidateRestaurantId=(resID)=>{
    const Schema=joi.object({
        _id:joi.string().required()
        
    });
    
    return Schema.validateAsync(resID);

};

export const Validatecategory=(category)=>{
    const Schema=joi.object({
        category:joi.string().required()
        
    });
    
    return Schema.validateAsync(category);

};
