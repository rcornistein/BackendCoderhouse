import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";


export class userManagerMongo{

    constructor(){
        this.model= userModel;
    };



    async createUser({email,password}){
        try {
            const resultado = await this.model.create({email: email,password: password});
           
            return resultado;
            
        } catch (error) {


            console.log("CreateUser   ",error.message);
            throw  new Error(`Could not create user ${error.message}`);
            
        }


    }



    async getUserByMail(object){
        try {
           
            const resultado = await this.model.findOne({email: object.email}).lean();
        
           
            return resultado;
            
        } catch (error) {


            console.log("GetUser   ",error.message);
            throw  new Error(`Could not get user ${error.message}`);
            
        }


    }



}