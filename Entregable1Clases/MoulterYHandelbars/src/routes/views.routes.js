

import { Router } from "express";
import {ProductManager} from '../ProductManager.js';

const viewsRouter = Router();

let Products=  new ProductManager('./src/productos.json');



//http://localhost:8080/home
viewsRouter.get("/home",async (req,res)=>{

    
    try {
        
        const currentProducts = await Products.getProducts();
       
        const data={
            products: currentProducts
        }
        res.render("home",data);
        
    } catch (error) {
        res.status(error.status || 500).send({
            error: {
              status: error.status || 500,
              message: error.message || "Server error",
            },
          });
        
    }
    

});



viewsRouter.get("/realTimeProducts", async (req,res)=>{

    
    try {
        
        const currentProducts = await Products.getProducts();
       
        const data={
            products: currentProducts
        }
        res.render("realTimeProducts",data);
        
    } catch (error) {
        res.status(error.status || 500).send({
            error: {
              status: error.status || 500,
              message: error.message || "Server error",
            },
          });
        
    }
        
  

        
   
    

});


export default viewsRouter;

