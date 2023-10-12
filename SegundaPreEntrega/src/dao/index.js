import { ProductManagerMongo } from "./mongo/productManagerMongo.js";
import { CartManagerMongo } from "./mongo/cartManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";
import { __dirname } from "../utils.js";
import path from "path";

export const productsService = new ProductManagerMongo();
export const chatService= new ChatManagerMongo();
export const cartsService = new CartManagerMongo();