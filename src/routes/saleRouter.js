import express from "express";
import { confirmCheckout, checkoutInfo } from "../controllers/saleController.js";

const saleRouter = express.Router();
saleRouter.post(
  "/checkout",
  confirmCheckout
)
saleRouter.get(
  `/checkout/:saleId`,
  checkoutInfo
);

export default saleRouter;