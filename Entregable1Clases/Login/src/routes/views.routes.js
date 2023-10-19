
/*
https://github.com/Automattic/mongoose/issues/6279

https://www.npmjs.com/package/mongoose-paginate-v2
*/
import { Router } from "express";
import {escape} from "querystring"

//import { productsModel } from "../dao/models/product.model.js";
import { chatModel } from "../dao/models/chat.model.js";
import { productsService } from "../dao/index.js";
import { cartsService } from "../dao/index.js";


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


viewsRouter.get("/products",  async (req,res)=>{
    try {


        

        const user=req.session.email;
        const rol=req.session.rol;
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
    


        const currentProducts =  await productsService.paginateProducts(limit,page,order,filters);
      

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
         




         let categories= await productsService.getCategories();

         currentProducts.payload.forEach(element => {
            element.available= element.stock>0?'Available':'Not available';
          

         });
      
         
        const data={
                products: currentProducts.payload,
                user:user,
                rol:rol,
            
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

});






viewsRouter.get("/carts/:cid",  async (req,res)=>{
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

});






export default viewsRouter;


