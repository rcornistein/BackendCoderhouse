import mongoose from "mongoose";




const userCollection='carts';


const userSchema=new mongoose.Schema({

    timestamp: {
        type: Date,
        default: Date.now
    },
    products: [
        {
       pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productsModel'           
        },
        quantity: {
            type: Number,
            default: 1
        },
        default: []
    
    }
  
]
  
       
    


});


export const cartsModel =mongoose.model(userCollection,userSchema);