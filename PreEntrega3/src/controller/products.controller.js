import { uploader } from "../utils.js";

import {escape} from "querystring"
import passport from "passport";

import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";


import { ProductsService } from "../service/products.service.js";

export class ProductsController{



static getProducts = async (req,res)=>  {

    try {
  
  
      let limit = parseInt(req.query.limit);
      if(!limit){  limit=10};
  
      let page= parseInt(req.query.page);
      if(!page){page=1};
   
      let order = req.query.order;
  
      if(!order){order="none"}
  
      let category= escape(req.query.category).split('%20').join(' ')||'All categories';
    
     
  
      let filters={}
      if(category !='All categories' && category!=='undefined' && category){
          filters={category: category}
      }
      
      
      if(category==='undefinded'){
        category==='All categories'
      }
  
      let stock=req.query.stock;
  
      if(stock==='1'){
          filters={stock: {$gt: 0}, ...filters}
      }
      if(stock==='0'){
          filters={stock: 0,... filters}
      }
  
  
  
      const currentProducts =  await ProductsService.paginateProducts(limit,page,order,filters);
  
      let result = {status: "succes"
  
      ,payload: currentProducts.payload
      ,    totalPages: currentProducts.totalPages
          , prevPage: currentProducts.hasPrevPage? page-1:null
          , nextPage: currentProducts.hasNextPage?page+1:null
          ,page
          ,hasPrevPage: currentProducts.hasPrevPage
          ,hasNextPage: currentProducts.hasNextPage
          ,prevLink: currentProducts.hasPrevPage? `http://localhost:8080/api/products?limit=${limit}&page=${page-1}&order=${order}&category=${category.split(' ').join('%20')}&stock=${stock}`: null
          ,nextLink: currentProducts.hasNextPage? `http://localhost:8080/api/products?limit=${limit}&page=${page-1}&order=${order}&category=${category.split(' ').join('%20')}&stock=${stock}`: null
        };
       
  
  
       res.status(200).send({result: result})
      
      
    } catch (error) {
  
      let result = {status: error.message, 
        payload: []
        , totalPages: null
        , prevPage: null
        , nextPage: null
        ,page:null
        ,hasPrevPage: null
        ,hasNextPage: null
        ,prevLink: null
        ,nextLink:  null
      
      };
    
    }
   
}


 static GetPid= async (req,res)=>  {

    const id = req.params.pid;
   const prod= await ProductsService.getProductById(id);
   //console.log(prod);
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
    
    
    
}

static postProduct = async (req,res) => {
    try {
      const newUser= req.body;
     
      const {title,description,price,code,stock,status,thumbnail,category}= newUser;
      
      let thumbnail2= req.file.originalname||"nofile";
      const addProduct= await ProductsService.createProduct({title,description,price,thumbnail2,code,stock,status,category}) ;
      
      const currentProducts = await ProductsService.getProducts();
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
  }

 static PutProduct=async (req,res)=>{
    try {
      const id=req.params.productId;
      const {title,description,price,code,stock,status,category}= req.body;
    
      let updateProduct=req.body;
      
      if(req.file){
          
          let thumbnail= `${code}-${req.file.originalname}`;
          
           updateProduct= {title,description,price,code,stock,status,thumbnail,category};
      }
      
  
      
      //const resultProduct= await products.updateProduct(id,updateProduct);
  
      const resultProduct= await ProductsService.updateProduct(
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
    
  }

  static DeleteProduct = async (req,res)=>{

  
    try {
      const id=req.params.productId;
  
   
      const resultDelete= await  ProductsService.deleteProduct(id)
      const currentProducts = await ProductsService.getProducts();
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
  
  
  }

}