import e from "express";
import mongoose from "mongoose";


export const mongoConnect = async() =>{
    try {

        await mongoose.connect('mongodb+srv://CoderUser:CoderUser@codercluster.zctryny.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=AtlasApp'
        
        );
        console.log("Connected to Mongo Database");
        
    } catch (error) {

        console.log("Cannot connect to database" +error)
        
    }

}