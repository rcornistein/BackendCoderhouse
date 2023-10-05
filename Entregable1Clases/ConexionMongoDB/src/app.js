

import express, { request, response } from "express";
import { engine } from 'express-handlebars';

import { __dirname } from "./utils.js";
 
import viewsRouter  from "./routes/views.routes.js";
import  productsRouter from './routes/products.routes.js';
import  cartsRouter from './routes/cart.routes.js';

import {Server} from "socket.io";

import path from "path";
//import {ProductManager} from './dao/files/ProductManager.js';
import mongoose from "mongoose";
import { mongoConnect } from "./config/db.js";
import { chatService } from "./dao/index.js";

//import { ProductManagerMongo } from "./dao/mongo/productManagerMongo.js";
//import { CartManagerMongo } from "./dao/mongo/cartManagerMongo.js";
//import { ChatManagerMongo } from "./dao/mongo/chatManagerMongo.js";


//import { error } from "console";

//servidor express
const port=8080;
const app=express();



// se activa el servidor
const httpServer= app.listen(8080,()=> console.log("El servidor esta funcionando"));



//conexion con mongoose

mongoConnect();

app.use(express.json()); //datos en json
app.use(express.urlencoded({extended:true})); //data formularios en json



//servidor de websocket para el backend
const socketServer = new Server(httpServer);



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




//let Products=  new ProductManager('./src/dao/productos.json');



socketServer.on("connection",async (socket)=>{

    try {

        console.log("cliente conectado", socket.id);
        //recibir mgs del cliente
        //socket.emit("chatHistory", chat);

    //recibimos el mensaje de cada usuario
      socket.on("msgChat", async (data)=>{
        //chat.push(data);
       

               
     
        let result = await chatService.createChat(data.timestamp,data.user,data.message); 
        //ChatManagerMongo.createChat(data.user,data.message);
        socket.broadcast.emit("chatHistory", data);
        socket.emit("chatHistory", data);
        //enviamos el historial del chat a todos los usuarios conectados
        
      });

    //recibimos mensaje de conection de nuevo cliente
    socket.on("authenticated", (data)=>{
        socket.broadcast.emit("newUser",`El usuario ${data} se acaba de conectar`);
     })
              
    } catch (error) {
        
    }
    
});



//Routers
app.use('/products',productsRouter);
app.use('/carts',cartsRouter);
app.use(viewsRouter);




