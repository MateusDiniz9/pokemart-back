import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import signUpRoute from "./routes/signUpRoute.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(signUpRoute);

server.listen(process.env.PORT_API, () => {
  console.log(`Listening on port ${process.env.PORT_API}`);
});
