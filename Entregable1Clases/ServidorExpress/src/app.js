import express, { request, response } from "express";
import {ProductManager} from './ProductManager.js';

const port=8080;
const app=express();



let products= new ProductManager('./productos.json');

app.listen(8080,()=> console.log("El servidor esta funcionando"));

app.get("/products",async (request,response)=>  {
    const limit = request.query.limit;
    const prod= await products.getProducts();
    if(parseInt(limit)){
   
    response.send(prod.slice(0,limit));
    }
    else{
        const prod= await products.getProducts();
        response.send(prod);
    }
}
)

app.get("/products/:pid",async (request,response)=>  {
    console.log(request.params.pid);
    const id = parseInt(request.params.pid);
   const prod= await products.getProductById(id);
    
    if(prod===`Product ${id} not found`){
        response.send(`Product ${id} not found`);
    
    }
    else{
        response.send(prod);
    }
    
}
)

