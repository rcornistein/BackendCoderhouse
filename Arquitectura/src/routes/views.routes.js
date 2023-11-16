

import { Router } from "express";
import {escape} from "querystring"

//import { productsModel } from "../dao/models/product.model.js";
import { chatModel } from "../dao/models/chat.model.js";


import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import { ViewsController } from "../controller/views.controller.js";

const viewsRouter = Router();


viewsRouter.get("/realTimeProducts", ViewsController.GetRealTimeProducts);

viewsRouter.get("/chat", ViewsController.getChat);

viewsRouter.get("/updateProduct/:productId", ViewsController.UpdateProduct);      

viewsRouter.get("/products", passport.authenticate("jwtAuth",{session:false}), ViewsController.getProducts);



viewsRouter.get("/carts/:cid",  ViewsController.GetCartsCid);





export default viewsRouter;


