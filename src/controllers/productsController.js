import db from "../db/db.js";

export async function listProducts(req, res) {
  try {
    if (req.query.id) {
      const id = parseInt(req.query.id);
      const product = await db.collection("products").find({ id }).toArray();
      console.log(product);
      if (product.length === 0) {
        return res.sendStatus(404);
      }
      res.send(product);
      return;
    }
    const products = await db.collection("products").find({}).toArray();
    res.send(products);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
