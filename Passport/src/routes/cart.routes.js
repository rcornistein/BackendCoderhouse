import Router from "express";




import { cartsService } from "../dao/index.js";

const cartsRouter = Router();

cartsRouter.post("/",async (req,res) => {
    try {
      
     const result =await cartsService.createCart();
     res.status(200).send({payload: result}); 

    } catch (error) {
      res.status(error.status || 500).send({
          error: {
          
            message: error.message || "Server error"
          },
        });
  
      
    }
      
      ;
  });

  cartsRouter.delete("/:cid",async (req,res) => {
    try {

        const cid=req.params.cid;
      const cart= await cartsService.getCartById(cid);
      console.log(cart);
     
      cart.products=[];
      
        const result= await cartsService.updateCart(cid, cart);

        

        res.status(200).send({payload: result}); 

    } catch (error) {
      res.status(error.status || 500).send(
           {
            
            message: error.message 
          }
        );
  
      
    }      ;
  });


  cartsRouter.put("/:cid/products/:pid",async (req,res) => {
    try {

        const cid=req.params.cid;
        const pid= req.params.pid;
        const quantity= parseInt(req.body.quantity)||1;
        

         const result = await cartsService.addProductToCart(cid,pid,quantity);

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
  });


  cartsRouter.put("/:cid",async (req,res) => {
    try {
  
        const cid=req.params.cid;
     /* arregglo de id de productos */
        let products= req.body.products;

       
        let cart = await cartsService.getCartById(cid);
    
        
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
  });


  cartsRouter.delete("/:cid/products/:pid",async (req,res) => {
    try {

        const cid=req.params.cid;
        const pid= req.params.pid;

         const result = await cartsService.daleteProductToCart(cid,pid);

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
  });


  cartsRouter.get("/",async (req,res) => {
    try {

     

         const result = await cartsService.getCart()

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
  });

  cartsRouter.get("/:cid",async (req,res) => {
    try {

        const cid=req.params.cid;
       

         const result = await cartsService.getCartById(cid);

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
  });




export default cartsRouter;

