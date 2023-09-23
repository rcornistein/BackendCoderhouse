

import { Router } from "express";
import {ProductManager} from '../ProductManager.js';

const viewsRouter = Router();

let Products=  new ProductManager('./src/productos.json');



//http://localhost:8080/home
viewsRouter.get("/home",async (req,res)=>{

    
    try {
        
        const currentProducts = await Products.getProducts();
       
        const data={
            products: currentProducts,
            style: "home.css"
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




viewsRouter.get("/updateProduct/:productId", async (req,res)=>{

    
    try {
        const id=parseInt(req.params.productId);
        const currentProduct = await Products.getProductById(id);
       
       
        const data={
            product: currentProduct,
            style: "update.css"
        }
        console.log(data.product.title);
        
        res.render("updateProduct",data);
        
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

