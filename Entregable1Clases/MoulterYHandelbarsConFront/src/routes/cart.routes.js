import Router from "express";
import {CartManager} from '../CartManager.js';

const cartsRouter = Router();


let carts= new CartManager('./src/carts.json');


cartsRouter.get("/",async (req,res)=>  {

    try {
      
        const carts= await carts.getCarts();
        res.send(carts);
      
    } catch (error) {
        res.status(error.status || 500).send({
        error: {
          status: error.status || 500,
          message: error.message || "Server error",
        },
      });
      
    }
     
  }
  )


  cartsRouter.get("/:cid",async (req,res)=>  {

    const id = parseInt(req.params.cid);
    const cart= await carts.getCartById(id);

   try {

       if(cart===`Shopping cart ${id} not found`){
        res.status(cart.status).send({message: cart.message});
  
     }
      else{
        res.json(cart);
      }
    
   } catch (error) {

    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Server error",
      },
    });
    
   }
    
    
    
})



cartsRouter.post("/",async (req,res) => {
    try {
      
     
      
      
      const addcart= await carts.addCart();
      
      res.status(addcart.status).send({message:addcart.message}); 
      
    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  });

  cartsRouter.post("/:cid/product/:pid",async (req,res) => {
    try {
      
     
        const pid=parseInt(req.params.pid);
        const cid=parseInt(req.params.cid);
        const updatedCart= await carts.addProductToCart(cid,pid);

        res.status(updatedCart.status).send({message:updatedCart.message}); 
     
       
      
    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  });


  cartsRouter.delete("/cart/:cid/product/:pid",async (req,res) => {
    try {
      
     
        const pid=parseInt(req.params.pid);
        const cid=parseInt(req.params.cid);
        const updatedCart= await carts.deleteProductFromCart(cid,pid);

        res.status(updatedCart.status).send({message:updatedCart.message}); 
     
       
      
    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  });

export default cartsRouter;