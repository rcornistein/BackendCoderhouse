import express, { request, response } from "express";

import  productsRouter from './routes/products.routes.js';
import  cartsRouter from './routes/cart.routes.js';


const port=8080;
const app=express();





app.listen(8080,()=> console.log("El servidor esta funcionando"));
app.use(express.json()); //datos en json
app.use(express.urlencoded({extended:true})); //data formularios en json
app.use('/products',productsRouter);
app.use('/carts',cartsRouter);

app.use(express.static('../public'));




