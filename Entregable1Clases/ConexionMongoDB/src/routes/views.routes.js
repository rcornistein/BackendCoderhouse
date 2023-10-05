

import { Router } from "express";

//import { productsModel } from "../dao/models/product.model.js";
import { chatModel } from "../dao/models/chat.model.js";
import { productsService } from "../dao/index.js";

const viewsRouter = Router();

//let Products=  new ProductManager('./src/dao/productos.json');




viewsRouter.get("/home",async (req,res)=>{

    
    try {
        
        const currentProducts = await productsService.getProducts();       

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
        
        const currentProducts = await productsService.getProducts();
       
        const data={
            products: currentProducts,
            style: "home.css"
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

viewsRouter.get("/chat", async (req,res)=>{

    
    try {
        const data={
            style: "chat.css"
        }
        res.render("chat",data);
        
        
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
        const id=req.params.productId;
        const currentProduct = await productsService.getProductById(id);
       
 
       
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


viewsRouter.get("/productos",  async (req,res)=>{

    try {
        const currentProducts = await productsService.getProducts();       

        const data={
            products: currentProducts,
            style: "update.css"
           
        }
        res.render("products",data);

      
    } catch (error) {
        
    }


        

    
       

});


export default viewsRouter;


