import express from "express";
import { listProducts } from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.get("/products", listProducts);

export default productsRouter;
