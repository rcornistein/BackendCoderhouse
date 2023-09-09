

import Router from "express";
import {ProductManager} from '../ProductManager.js';

const productsRouter = Router();

let products= new ProductManager('./src/productos.json');

productsRouter.get("/",async (request,response)=>  {

  try {
    const limit = request.query.limit;
    const prod= await products.getProducts();
    if(parseInt(limit)){
   
    response.send(prod.slice(0,limit));
    }
    else{
        const prod= await products.getProducts();
        response.json(prod);
    }
    
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

productsRouter.get("/:pid",async (request,response)=>  {

    const id = parseInt(request.params.pid);
   const prod= await products.getProductById(id);
   try {

       if(prod===`Product ${id} not found`){
      response.status(prod.status).send({message: `Product ${id} not found`});
  
     }
      else{
      response.json(prod);
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


productsRouter.post("/",async (req,res) => {
  try {
    const newUser= req.body;
   
    const {title,description,price,thumbnail,code,stock,status,category}= newUser;
    
    const addProduct= await products.addProduct(title,description,price,thumbnail,code,stock,status,category);
    res.status(addProduct.status).send({message:addProduct.message}); 
    
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


productsRouter.put("/:productId",async (req,res)=>{
  try {
    const id=parseInt(req.params.productId);

    const updatedProduct= req.body;
    
    const resultProduct= await products.updateProduct(id,updatedProduct);
    res.status(resultProduct.status).send({message: resultProduct.message});
    
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Server error",
      },
    });
    
  }
  
});

productsRouter.delete("/:productId",async (req,res)=>{

  
  try {
    const id=parseInt(req.params.productId);

    const resultDelete= await products.deleteProduct(id);
    res.status(resultDelete.status).json(resultDelete.message);
  } catch (error) {

    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Server error",
      },
    });
    
  }


})


export default productsRouter;