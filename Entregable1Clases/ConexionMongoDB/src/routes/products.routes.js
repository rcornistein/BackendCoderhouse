

import Router from "express";



import { uploader } from "../utils.js";
import { productsModel } from "../dao/models/product.model.js";
import { ProductManagerMongo } from "../dao/mongo/productManagerMongo.js";
import { productsService } from "../dao/index.js";

const productsRouter = Router();


productsRouter.get("/",async (req,res)=>  {

  try {
    const limit = req.query.limit;
    const prod= await productsService.getProducts();
    if(parseInt(limit)){
   
    res.send(prod.slice(0,limit));
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
   
}
)

productsRouter.get("/:pid",async (req,res)=>  {

    const id = req.params.pid;
   const prod= await productsService.getProductById(id);
   console.log(prod);
   try {

       if(prod.id){
      res.status(200).send({message: `Product ${id} not found`});
  
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
    const addProduct= await productsService.createProduct({title,description,price,thumbnail2,code,stock,status,category}) ;
    
    const currentProducts = await productsService.getProducts();
   ///console.log(req.socketServer);
    req.socketServer.sockets.emit('realTimeproducts', currentProducts); 
    
    res.status(200).send({message:" Product added"}); 
    
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
    const id=req.params.productId;
    const {title,description,price,code,stock,status,category}= req.body;
  
    let updateProduct=req.body;
    
    if(req.file){
        
        let thumbnail= `${code}-${req.file.originalname}`;
        
         updateProduct= {title,description,price,code,stock,status,thumbnail,category};
    }
    

    
    //const resultProduct= await products.updateProduct(id,updateProduct);

    const resultProduct= await productsModel.findByIdAndUpdate(
      {
        "_id":id
      },
      updateProduct);

 

    res.status(200).send({message: `Product ${id} updated`});
    
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
    const id=req.params.productId;

 
    const resultDelete= await  productsService.deleteProduct(id)
    const currentProducts = await productsService.getProducts();
    ///console.log(req.socketServer);
     req.socketServer.sockets.emit('realTimeproducts', currentProducts); 
    res.status(200).json(`product ${id} deleted`);
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
