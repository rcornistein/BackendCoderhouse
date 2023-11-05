

import express, { request, response } from "express";
import { engine } from 'express-handlebars';

import { __dirname } from "./utils.js";
 
import viewsRouter  from "./routes/views.routes.js";
import  productsRouter from './routes/products.routes.js';
import  cartsRouter from './routes/cart.routes.js';
import  userRouter from './routes/user.routes.js';

import {Server} from "socket.io";

import path from "path";
//import {ProductManager} from './dao/files/ProductManager.js';
import mongoose from "mongoose";
import { mongoConnect } from "./config/db.js";
import { chatService } from "./dao/index.js";

/* para popular la base de productos */
import { productsService } from "./dao/index.js";

//import { ProductMocker } from "./RandomGenerator/randomProduct.js";


import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from  "cookie-parser";
import passport from "passport";



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








socketServer.on("connection",async (socket)=>{

    try {

        console.log("cliente conectado", socket.id);
        let history = await chatService.getChats(); 
        socket.emit("messages", history);


    //recibimos el mensaje de cada usuario
      socket.on("msgChat", async (data)=>{
        //chat.push(data);
       
        let result = await chatService.createChat(data.user,data.message,data.timestamp); 
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


app.use(cookieParser());
//app.use(session({}));
app.use(session({
  store: MongoStore.create({
      ttl:3000,
      mongoUrl:'mongodb+srv://CoderUser:CoderUser@codercluster.zctryny.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=AtlasApp'
  }),
  secret:"secretSessionCoder",
  resave:true,
  saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
//Routers
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use(viewsRouter);
app.use('/api/users',userRouter);
app.get('/', function(req, res){
  res.redirect('api/users/login');
});



