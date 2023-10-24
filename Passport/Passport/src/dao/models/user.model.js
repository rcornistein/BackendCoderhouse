import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    rol:{
    type: String,
    default: "user"
    },
    email:{
        type: String,
        require: true,
        unique: true
     
    },
    password:{
        type: String,
        require: true},
        

});
 
export const userModel = mongoose.model(usersCollection,userSchema);