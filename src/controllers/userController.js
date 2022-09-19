import db from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.signup;

  const encryptedPassword = bcrypt.hashSync(password, 12);

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.sendStatus(409);
    }

    const createUser = await db.collection("users").insertOne(
      {
        name,
        email,
        password: encryptedPassword,
      },
      (err, result) => {
        if (err) {
          return res.status(500).send(console.error(err));
        } else {
          db.collection("cart").insertOne({
            userId: result.insertedId.toString(),
          });
        }
      }
    );
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function createToken(req, res) {
  const { email, password } = res.locals.login;

  try {
    const user = await db.collection("users").findOne({ email });
    const passwordCheck = bcrypt.compareSync(password, user.password);

    if (user && passwordCheck) {
      const session = await db
        .collection("sessions")
        .findOne({ userId: user._id });

      if (session) {
        res.status(200).send({
          userId: session.userId,
          token: session.token,
          username: user.name,
        });
      } else {
        const token = uuid();
        await db.collection("sessions").insertOne({
          userId: user._id,
          token,
          date: Date.now(),
        });
        res.status(200).send({
          userId: user._id,
          token,
          username: user.name,
        });
      }
    } else {
      res.sendStatus(409);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
