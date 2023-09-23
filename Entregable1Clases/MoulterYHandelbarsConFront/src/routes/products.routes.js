

import Router from "express";
import {ProductManager} from '../ProductManager.js';
import { uploader } from "../utils.js";

const productsRouter = Router();

let products= new ProductManager('./src/productos.json');

productsRouter.get("/",async (req,res)=>  {

  try {
    const limit = req.query.limit;
    const prod= await products.getProducts();
    if(parseInt(limit)){
   
    res.send(prod.slice(0,limit));
    }
    else{
        const prod= await products.getProducts();
        res.json(prod);
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

productsRouter.get("/:pid",async (req,res)=>  {

    const id = parseInt(req.params.pid);
   const prod= await products.getProductById(id);
   try {

       if(prod===`Product ${id} not found`){
      res.status(prod.status).send({message: `Product ${id} not found`});
  
     }
      else{
      res.json(prod);
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


productsRouter.post("/",uploader.single("file"),async (req,res) => {
  try {
    const newUser= req.body;
   
    const {title,description,price,code,stock,status,thumbnail,category}= newUser;
    
    let thumbnail2= req.file.originalname||"nofile";
    const addProduct= await products.addProduct(title,description,price,thumbnail2,code,stock,status,category);
    
    const currentProducts = await products.getProducts();
   ///console.log(req.socketServer);
    req.socketServer.sockets.emit('realTimeproducts', currentProducts); 
    
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










productsRouter.put("/:productId" , uploader.single("file") , async (req,res)=>{
  try {
    const id=parseInt(req.params.productId);

 

    const {title,description,price,code,stock,status,category}= req.body;

    let updateProduct=req.body
    

    
    if(req.file){
        
        let thumbnail= `${code}-${req.file.originalname}`;
        
         updateProduct= {title,description,price,code,stock,status,thumbnail,category};
    }
    

    
    const resultProduct= await products.updateProduct(id,updateProduct);

 

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
    const currentProducts = await products.getProducts();
    ///console.log(req.socketServer);
     req.socketServer.sockets.emit('realTimeproducts', currentProducts); 
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