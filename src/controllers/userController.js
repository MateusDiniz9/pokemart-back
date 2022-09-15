import db from "../db/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

export async function createToken(req, res) {
    const { email, password } = res.locals.login;

    try {
        const user = await db.collection('users').findOne({ email });
        const passwordCheck = bcrypt.compareSync(password, user.password);

        if (user && passwordCheck) {
            const session = await db.collection('sessions').findOne({ userId: user._id })

            if (session) {
                res.status(200).send({
                    userId: session.userId,
                    token: session.token,
                    username: user.name
                });
            } else {
                const token = uuid();
                await db.collection("sessions").insertOne({
                    userId: user._id,
                    token,
                    date: Date.now()
                });
                res.status(200).send({
                    userId: user._id,
                    token,
                    username: user.name
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