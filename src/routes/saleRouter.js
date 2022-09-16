import express from "express";
import { getCart, confirmCheckout, checkoutInfo } from "../controllers/saleController.js";

const saleRouter = express.Router();
saleRouter.get(
  "/cart",
  getCart
)
saleRouter.post(
  "/cart",
  confirmCheckout
)
saleRouter.get(
  `/checkout/:saleId`,
  checkoutInfo
);

export default saleRouter;