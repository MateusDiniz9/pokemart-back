import express from "express";
import { createToken, signUp } from "../controllers/userController.js";
import loginDataSanitizer from "../middlewares/loginDataSanitizer.js";
import loginSchemaValidation from "../middlewares/loginSchemaValidation.js";
import signUpDataSanitizer from "../middlewares/signupDataSanitizer.js";
import signUpSchemaValidation from "../middlewares/signupSchemaValidation.js";

const userRouter = express.Router();
userRouter.post(
  "/sign-up",
  signUpSchemaValidation,
  signUpDataSanitizer,
  signUp
);
userRouter.post(
  "/sign-in",
  loginSchemaValidation,
  loginDataSanitizer,
  createToken
);

export default userRouter;
