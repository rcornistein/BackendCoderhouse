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




