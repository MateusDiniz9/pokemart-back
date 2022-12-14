import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";
import userRouter from "./routes/userRouter.js";
import saleRouter from "./routes/saleRouter.js";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter);
server.use(cartRouter);
server.use(saleRouter);
server.use(productsRouter);


async function checkSessions() {
  const timeAllowed = 7.2e6; //2 hours

  try {
    const sessions = await db.collection("sessions").find().toArray();

    sessions.forEach((session) => {
      const timeNow = Date.now();
      if (timeNow - session.time > timeAllowed) {
        db.collection("sessions").deleteOne(session);
      }
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

setInterval(checkSessions, 60000); //checks every minute

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
