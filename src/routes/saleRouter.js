import express from "express";
import { confirmCheckout, checkoutInfo } from "../controllers/saleController";

const saleRouter = express.Router();
saleRouter.post(
  "/cart",
  confirmCheckout
)
saleRouter.get(
  "/checkout/:saleId",
  checkoutInfo
);

export default saleRouter;
