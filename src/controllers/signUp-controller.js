import joi from "joi";
import bcrypt from "bcrypt";
import mongo from "../db/db.js";

const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
});

let db = await mongo;

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const validation = signUpSchema.validate({
    name,
    email,
    password,
  });

  if (validation.error) {
    return res.status(400).send(validation.error.message);
  }
  const encryptedPassword = bcrypt.hashSync(password, 12);
  try {
    db.collection("users").insertOne({
      name,
      email,
      password: encryptedPassword,
    });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export { signUp };
