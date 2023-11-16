import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    
    first_name:{
        type:String,
        required:true
    },
    last_name:String,
    rol:{
    type: String,
    default: "user"
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:Number,
    password:{
        type:String,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
        

});
 
export const userModel = mongoose.model(usersCollection,userSchema);