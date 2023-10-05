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
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  });

  cartsRouter.delete("/:cid",async (req,res) => {
    try {

        const cid=req.params.cid;

      
        const result= await cartsService.deleteCart(cid);

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


  cartsRouter.put("/:cid/products/:pid",async (req,res) => {
    try {

        const cid=req.params.cid;
        const pid= req.params.pid;

         const result = await cartsService.addProductToCart(cid,pid)

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