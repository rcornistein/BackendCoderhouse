import Router from "express";





import { CartsController } from "../controller/carts.controller.js";

const cartsRouter = Router();

  cartsRouter.post("/",CartsController.post);

  cartsRouter.delete("/:cid",CartsController.delete);


  cartsRouter.put("/:cid/products/:pid",CartsController.putCidPid
  );

  cartsRouter.put("/:cid",CartsController.putCid);


  cartsRouter.delete("/:cid/products/:pid",CartsController.delete);


  cartsRouter.get("/",CartsController.get);

  cartsRouter.get("/:cid",CartsController.getCid);




export default cartsRouter;

