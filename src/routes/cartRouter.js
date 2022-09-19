import express from "express";
import { getCart, changeProductQuantity } from "../controllers/cartController.js";

const cartRouter = express.Router();
cartRouter.get(
  "/cart",
  getCart
)
cartRouter.put(
    "/cart",
    changeProductQuantity
)

export default cartRouter;