
import Router from "express";
import { uploader } from "../utils.js";
import {escape} from "querystring"
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";


//import { productsModel } from "../dao/models/product.model.js";


import { ProductsController } from "../controller/products.controller.js";



const productsRouter = Router();


productsRouter.get("/",passport.authenticate("jwtAuth",{session:false}) , ProductsController.getProducts)


productsRouter.get("/:pid",passport.authenticate("jwtAuth",{session:false}),ProductsController.GetPid)


productsRouter.post("/",uploader.single("file"),passport.authenticate("jwtAuth",{session:false}),ProductsController.postProduct);





productsRouter.put("/:productId" , uploader.single("file") ,  ProductsController.PutProduct);

productsRouter.delete("/:productId",passport.authenticate("jwtAuth",{session:false}),ProductsController.DeleteProduct)


export default productsRouter;
