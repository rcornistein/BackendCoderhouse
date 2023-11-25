import Router from "express";

import { CartsService } from "../service/carts.service.js";



export class CartsController{

static post = async (req,res) => {
    try {
      
     const result =await CartsService.createCart();
     res.status(200).send({payload: result}); 

    } catch (error) {
      res.status(error.status || 500).send({
          error: {
          
            message: error.message || "Server error"
          },
        });
  
      
    }
      
      ;
  }


 static delete = async (req,res) => {
    try {

        const cid=req.params.cid;
      const cart= await CartsService.getCartById(cid);
      console.log(cart);
     
      cart.products=[];
      
        const result= await CartsService.updateCart(cid, cart);

        

        res.status(200).send({payload: result}); 

    } catch (error) {
      res.status(error.status || 500).send(
           {
            
            message: error.message 
          }
        );
  
      
    }      ;
  }
 
  static putCidPid = async (req,res) => {
    try {

        const cid=req.params.cid;
        const pid= req.params.pid;
        const quantity= parseInt(req.body.quantity)||1;
        

         const result = await CartsService.addProductToCart(cid,pid,quantity);

        res.status(200).json(`product ${pid} added to cart ${cid}`);


    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }


  static putCid = async (req,res) => {
    try {
  
        const cid=req.params.cid;
     /* arregglo de id de productos */
        let products= req.body.products;

       
        let cart = await CartsService.getCartById(cid);
    
        
          if(cart.products){
          cart.products= products}
          else{
            cart.products={};
            cart.products=products;
          };
         const result = await cartsService.updateCart(cid,cart);

        res.status(200).json(` cart ${cid} updated`);


    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;

    }


static delete = async (req,res) => {
    try {

        const cid=req.params.cid;
        const pid= req.params.pid;

         const result = await CartsService.daleteProductToCart(cid,pid);

        res.status(200).json(`product ${pid} deleted from cart ${cid}`);


    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }



  static get = async (req,res) => {
    try {

     

         const result = await CartsService.getCart()

        res.status(200).send({payload: result});


    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }

  static getCid = async (req,res) => {
    try {

        const cid=req.params.cid;
       

         const result = await CartsService.getCartById(cid);

        res.status(200).send({payload: result});


    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }


}