// const { createTable, insertUser } = require("../models/createuser");
import { createTable, findByEmail, insertUser } from "../models/createuser.js";
import express from "express";
const app = express();
// app.use(authenticateToken)

export default async function user(req, res) {
  try {
    await createTable();
  } catch (e) {
    res
      .status(500)
      .send({ error: "Unable to create Table", message: e.message });
  }

  await findByEmail(req.body.emailId).then(async (data) => {
    if (data.data)
      return res.status(400).json({ message: "Email already in use" });
    else {
      await insertUser(req.body).then((data) => {
        if (data.error != undefined) {
          res
            .status(500)
            .send({ error: "Internal server error", message: data.error });
        } else {
          res.status(200).send(data);
        }
      });
    }
  });
}
