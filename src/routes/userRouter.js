import express from 'express';
import { createToken } from '../controllers/userController.js';
import loginDataSanitizer from '../middlewares/loginDataSanitizer.js';
import loginSchemaValidation from '../middlewares/loginSchemaValidation.js';

const userRouter = express.Router();
userRouter.post('/sign-in', loginSchemaValidation, loginDataSanitizer, createToken);

export default userRouter;