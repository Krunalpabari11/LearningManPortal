import express from "express";
const app = express();

import updateUser from "../models/updateUser.js";
import { getParticularUser } from "../models/getAllUsers.js";
// app.use(authenticate);
export async function update(req, res) {
  await updateUser(req.body).then((data) => {
    if (data.error != undefined) {
      res
        .status(500)
        .send({ error: "Internal server error", message: data.error });
    } else {
      let data = getParticularUser(req.body);
      res.status(200).send(data);
    }
  });
}
