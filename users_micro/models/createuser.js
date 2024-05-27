import dotenv from "dotenv";
import mysql from "mysql";
import bycrpt from "bcrypt";
// const bycrpt=require('bcrypt')
import db from "../DBconnection.js";
dotenv.config();
export async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      emailId varchar(255) UNIQUE NOT NULL,
      username VARCHAR(50)  NOT NULL,
      password VARCHAR(255) NOT NULL
    )`;

  const [data] = await db.execute(query);
  // console.log(data);
  return data;
}
export async function insertUser(req) {
  const username = req.username;
  const emailId = req.emailId;
  const password = req.password;
  const salt = 10;
  const hash = await bycrpt.hash(password, salt);
  const obj = {
    emailId: emailId,
    username: username,
    password: hash,
  };
  const query = "insert into users set ?";
  try {
    const rows = await db.query(query, obj);
    const result = { data: rows };
    // console.log(result);
    return result;
  } catch (e) {
    let result = { error: e };
    return result;
  }
}
export async function findByEmail(emailId) {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE emailId = ?", [
      emailId,
    ]);
    return { data: rows[0] };
  } catch (e) {
    let result = { error: e };
    return result;
  }
}
