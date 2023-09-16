import express, { request, response } from "express";
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
 
import viewsRouter  from "./routes/views.routes.js";
import  productsRouter from './routes/products.routes.js';
import  cartsRouter from './routes/cart.routes.js';
import {Server} from "socket.io";

import path from "path";
import {ProductManager} from './ProductManager.js';

//servidor express
const port=8080;
const app=express();



// se activa el servidor
const httpServer= app.listen(8080,()=> console.log("El servidor esta funcionando"));
//servidor de websocket para el backend
const socketServer = new Server(httpServer);


app.use(express.json()); //datos en json
app.use(express.urlencoded({extended:true})); //data formularios en json


//configuracion del motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views")); //=> /src/views

//dominio publico
app.use(express.static(path.join(__dirname,"/public")));


app.use((req, res, next) => {
  req.socketServer = socketServer;
  return next();
});

let Products=  new ProductManager('./src/productos.json');

socketServer.on("connection",async (socket)=>{

    try {

        console.log("cliente conectado", socket.id);
        //recibir mgs del cliente
              
    } catch (error) {
        
    }
    
});



//Routers
app.use('/products',productsRouter);
app.use('/carts',cartsRouter);
app.use(viewsRouter);










// Make io accessible to our router

/*
app.post('/socket/product/', async function(req, res) {
    //this is coming from an external resource

    try {
        const newUser= req.body;
       
        const {title,description,price,thumbnail,code,stock,status,category}= newUser;
        
        const addProduct= await Products.addProduct(title,description,price,thumbnail,code,stock,status,category);

        const currentProducts = await Products.getProducts();
        req.socketServer.emit('realTimeproducts', currentProducts);
        res.status(addProduct.status).send({message:addProduct.message}); 
        
      } catch (error) {
        res.status(error.status || 500).send({
            error: {
              status: error.status || 500,
              message: error.message || "Server error",
            },
          });
    
        
      }     



      
   })


*/



