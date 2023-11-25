import {escape} from "querystring"


import { chatModel } from "../dao/models/chat.model.js";
import { ProductsService } from "../service/products.service.js";

import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";


export class ViewsController {

    static GetRealTimeProducts = async (req,res)=>{

    
        try {
            
            const currentProducts = await ProductsService.getProducts();
           
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
            
    
    }


static getChat= async (req,res)=>{

    
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
        

}

  static UpdateProduct = async (req,res)=>{

    
    try {
        const id=req.params.productId;
        const currentProduct = await ProductsService.getProductById(id);
       
 
       
        const data={
            product: currentProduct,
            style: "update.css"
        }
     
        
        res.render("updateProduct",data);
        
    } catch (error) {
        res.status(error.status || 500).send({
            error: {
              status: error.status || 500,
              message: error.message || "Server error",
            },
          });
        
    }
}

    static getProducts = async (req,res)=>{
        try {
    
    
            
           
            const user=req.user.first_name;
            const rol=req.user.role;
            let limit = parseInt(req.query.limit);
            if(!limit){  limit=10};
    
            let page= parseInt(req.query.page);
            if(!page){page=1};
    
            if( !Number.isInteger(page)){
                res.render('ErrorProducts',{message: 'Page parameter is not integer'});
    
            }    
    
           
    
            let order = req.query.order;
    
            if(!order){order="none"}
    
            let category= escape(req.query.category).split('%20').join(' ');
          
     
    
            let filters={}
            if(category !='All categories' &&category !='undefined' && category){
                filters={category: category}
            }
            if(category==='undefined'){
                category='All categories'
            }
       
            let stock=req.query.stock;
    
            if(stock==='1'){
                filters={stock: {$gt: 0}, ...filters}
            }
            if(stock==='0'){
                filters={stock: 0,... filters}
            }
        
    
    
            const currentProducts =  await ProductsService.paginateProducts(limit,page,order,filters);
          
    
            if(parseInt(req.query.page)> currentProducts.totalPages   || parseInt(req.query.page) <1){
                res.render('ErrorProducts',{message: 'Page parameter is out of range'});
    
            }    
    
    
            let result = {status: true, totalPages: currentProducts.totalPages
                , prevPage: currentProducts.hasPrevPage? page-1:null
                , nextPage: currentProducts.hasNextPage?page+1:null
                ,page
                ,hasPrevPage: currentProducts.hasPrevPage
                ,hasNextPage: currentProducts.hasNextPage
                ,prevLink: currentProducts.hasPrevPage? `http://localhost:8080/products?limit=${limit}&page=${page-1}&order=${order}&category=${category.split(' ').join('%20')}&stock=${stock}`: null
                ,nextLink: currentProducts.hasNextPage? `http://localhost:8080/products?limit=${limit}&page=${page+1}&order=${order}&category=${category.split(' ').join('%20')}&stock=${stock}`: null
              };
             
    
    
    
    
             let categories= await ProductsService.getCategories();
    
             currentProducts.payload.forEach(element => {
                element.available= element.stock>0?'Available':'Not available';
              
    
             });
          
             
            const data={
                    products: currentProducts.payload,
                    user:user,
                    rol:rol,
                    IsAdmin: rol==='admin',
                    IsUser: rol==='user',
                
                    categories: categories,
                    style: "update.css",
                    page: page,
                    totalPages: result.totalPages,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage,
                    prevLink: result.prevLink,
                    nextLink: result.nextLink
                   
                };
                
            
                res.render("products",data);
          
        } catch (error) {
    
            console.log(error.message);
            
        }       
    
    }

 static GetCartsCid = async (req,res)=>{
    try {

        let cid = req.params.cid;
        const result = await cartsService.getCartById(cid);

    
        
        let data={
            products:result.products,
            style: 'carts.css'
        }

        res.render("carts",data);
      
    } catch (error) {

        console.log(error.message);
        
    }       

}

}