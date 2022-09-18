import db from "../db/db.js";
import { ObjectId } from "mongodb";

export async function confirmCheckout(req, res) {
    const { paymentForm, products } = req.body;
    const { authorization, userid } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const registeredUser = await db.collection('users').findOne({ userid });
    if (registeredUser === null) {return res.status(422).send('Você precisa estar cadastrado para finalizar a sua compra!')};

    const loggedIn = await db.collection('sessions').findOne({ token });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para conferir a sua compra!')};

    try {
      db.collection("sales").insertOne({
        userid,
        paymentForm,
        products
      });
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
}

export async function checkoutInfo(req, res) {
    const { saleId } = req.params;
    const { authorization, userid } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const loggedIn = await db.collection('sessions').findOne({ token });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para conferir a sua compra!')};

    try {
      const purchaseInfo = await db.collection('sales').findOne({ _id: ObjectId(saleId) });
      if (purchaseInfo.userid !== userid) {return res.status(422).send('Não foi possível encontrar esta compra na sua conta!')};
      res.status(200).send(purchaseInfo);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
}