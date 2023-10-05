import mongoose from "mongoose";
import { cartsModel } from "../models/cart.model.js";


export class CartManagerMongo{

    constructor(){
        this.model= cartsModel;
    };


    async createCart(){
        try {
            const resultado= await this.model.create({});
            return resultado;
             
         } catch (error) {
             console.log("Create Cart",error.message);
             throw  new Error(`Could not create cart ${error.message}`);
         }


    }

    async getCart(){
        try {
            const resultado = await this.model.find();
            return resultado;
            
        } catch (error) {


            console.log("Get Carts   ",error.message);
            throw  new Error(`Could not carts ${error.message}`);
            
        }


    }

    async getCartById(cartId){

        try {
            const resultado = await this.model.findById(cartId);
            return resultado;
            
        } catch (error) {


            console.log("GetCartById   ",error.message);
            throw  new Error(`Could not get cart ${error.message}`);
            
        }

    }

    async addProductToCart(cartId,productId){
        try {
           
    
            const cart= await this.model.findById(cartId).lean();
           
            let product= cart.products.find(prod=> prod._id.toString()===productId);
            if(product){
              
                cart.products.find(prod=>prod._id.toString()===productId).quantity +=1;
                
            }
            else{
    
                cart.products.push({"_id": productId, quantity:1});
             
            }
    
            const res= await this.model.findByIdAndUpdate({"_id": cartId},cart);
            return res;

            
        } catch (error) {
            

            console.log("AddProductToCart   ",error.message);
            throw  new Error(`Could not add product to cart ${error.message}`);
            
        }


    }

    async deleteCart(cartId){
        try {

            const result= await this.model.findByIdAndDelete(cartId);
            if(!result){
                throw new Error('Could not find cart');
            }
            return result;
            
        } catch (error) {
            console.log("deleteCart   ",error.message);
            throw  new Error(`Could not delete cart ${error.message}`);
            
        }


    }


}