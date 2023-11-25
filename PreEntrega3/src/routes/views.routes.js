

import { Router } from "express";
import {escape} from "querystring"

//import { productsModel } from "../dao/models/product.model.js";
import { chatModel } from "../dao/models/chat.model.js";

import { ProductsService } from "../service/products.service.js";
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import { ViewsController } from "../controller/views.controller.js";
import {isAuth,checkRole} from "../middlewares/auth.js"

const viewsRouter = Router();


viewsRouter.get("/realTimeProducts", ViewsController.GetRealTimeProducts);

viewsRouter.get("/chat", passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["user"]),ViewsController.getChat);

viewsRouter.get("/updateProduct/:productId", ViewsController.UpdateProduct);      

viewsRouter.get("/products", passport.authenticate("jwtAuth",{session:false}),ViewsController.getProducts);


viewsRouter.get("/carts/:cid",  ViewsController.GetCartsCid);

viewsRouter.get("/adminProducts", passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin"]),
async (req,res)=>{

    
    try {
        
        const currentProducts = await ProductsService.getProducts();       
       
        const data={
            products: currentProducts,
            style: "home.css"
        }
        res.render("adminProducts",data);
        
    } catch (error) {
        res.status(error.status || 500).send({
            error: {
              status: error.status || 500,
              message: error.message || "Server error",
            },
          });
        
    }
    

}


);



export default viewsRouter;


