import joi from "joi";


export const ValidateOrderDetails=(orderData)=>{
    const Schema=joi.object({
      
        orderDetails:joi.object({
            food:joi.string(),
            quantity:joi.number().integer().positive(),
            paymode:joi.string().required(),
            status:joi.string(),
            paymentDetails:joi.object({
                itemTotal:joi.number().required(),
                promo:joi.number().required(),
                tax:joi.number().required()
            })
        })
    });
    
    return Schema.validateAsync(orderData);

};