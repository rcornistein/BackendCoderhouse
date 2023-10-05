import mongoose from "mongoose";

const userCollection='chats';


const userSchema=new mongoose.Schema({

    timestamp: {
        type: Date,
        default: Date.now
    },
    user: {

        type: String,
        required: true
    },
    message:{
        type: String,
        require: true
    }
    


});


export const chatModel =mongoose.model(userCollection,userSchema);