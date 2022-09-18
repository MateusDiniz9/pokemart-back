import db from "../db/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function confirmCheckout(req, res) {
    const { paymentMethod, products } = req.body;
    const { authorization, userid } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const registeredUser = await db.collection('users').findOne({ _id: ObjectId(userid) });
    if (registeredUser === null) {return res.status(422).send('Você precisa estar cadastrado para finalizar a sua compra!')};

    const loggedIn = await db.collection('sessions').findOne({ token });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para concluir a sua compra!')};

    try {
      await db.collection("sales").insertOne({
        userid,
        paymentMethod,
        products,
        date: dayjs().format('DD/MM/YYYY')
      }, (err, result) => {
        if (err) 
          return res.status(500).send(console.error(err));
        else 
          return res.status(201).send(result.insertedId.toString());
      });
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