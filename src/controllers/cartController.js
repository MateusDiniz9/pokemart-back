import db from "../db/db.js";
import { ObjectId } from "mongodb";

export async function getCart(req, res) {
  const { authorization, userid } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const registeredUser = await db.collection('users').findOne({ _id: ObjectId(userid) });
  if (registeredUser === null) {return res.status(422).send('Você precisa estar cadastrado para finalizar a sua compra!')};

  const loggedIn = await db.collection('sessions').findOne({ token });
  if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para conferir a sua compra!')};

  try {
    const userCart = await db.collection("cart").findOne({ userId: userid });
    res.status(200).send(userCart);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function changeProductQuantity(req, res) {
    const { products }= req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const loggedIn = await db.collection('sessions').findOne({ token });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para fazer movimentações!')};

    try {
        await db.collection('cart').deleteOne({ userId: authorization.userid});
        await db.collection('cart').insertOne({
            userId: userid,
            products
        });
        const cart = await db.collection('cart').findOne({ userId: userid });
        res.status(201).send(cart);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}