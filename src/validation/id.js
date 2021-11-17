import joi from "joi";



export const ValidateId=(ID)=>{
    const Schema=joi.object({
        _id:joi.string().required()
        
    });
    
    return Schema.validateAsync(ID);

};