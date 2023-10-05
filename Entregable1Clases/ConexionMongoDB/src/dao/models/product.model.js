import mongoose  from "mongoose";



const userCollection='products';

const userSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    description: {
        type: String,
        required: true,
        max: 500
    },
    
    price: {
        type: Number,
        required: true
    },
    thumbnail:{
        type: Array

    },
    
    code: {
        type: String,
        required: true,
        max: 6,
        unique: true
    },
    
    stock: {
        type: Number,
        required: true    
    },
    status: {
        type: Boolean,
        default:true    
    },

    category: {
        type: String,
        required: true
          
    },
})

export const productsModel =mongoose.model(userCollection,userSchema);