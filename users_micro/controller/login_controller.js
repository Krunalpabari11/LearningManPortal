import authenticate from "../authenticateToken.js";
import validate from "../models/loginuser.js";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
// app.use(authenticateToken)

function login(req, res) {
  const data = {
    emailId: req.body.emailId,
    password: req.body.password,
  };

  validate(data)
    .then((status) => {
      switch (status) {
        case 404:
          return res.json({ error: "user not found" });
        case 401:
          return res.json({ error: "password doesn't match" });
        case 500:
          return res.json({ error: "internal server error" });
        case 200:
          const obj = {
            emailId: req.body.emailId,
            time: new Date().toISOString(),
          };

          const expire = 15 * 24 * 60 * 60;
          const token = jwt.sign(obj, process.env.secrret_key, {
            expiresIn: expire,
          });
          //   console.log(token);
          res.cookie("token", token, { httpOnly: true, maxAge: expire * 1000 });

          return res.json({ token: token, message: "login successful" });
        default:
          return res.json({ error: "unexpected status code" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: "internal server error" });
    });
}

export default login;
