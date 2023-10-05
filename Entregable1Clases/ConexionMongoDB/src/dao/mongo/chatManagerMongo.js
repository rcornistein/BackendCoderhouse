import { chatModel } from "../models/chat.model.js";

export class ChatManagerMongo{
    
    constructor(){
        this.model=chatModel;
    }


    async createChat(user,message){
        try {
            const resultado= await this.model.create({"user": user,"message": message});
            return resultado;
             
         } catch (error) {
             console.log("Create Cart",error.message);
             throw  new Error(`Could not create cart ${error.message}`);
         }


    }


}