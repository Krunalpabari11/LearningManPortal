import dotenv from "dotenv";

dotenv.config();
import db from "../DBconnection.js";

export async function getUsers() {
  try {
    const query = `select id,emailId,username from users`;
    const [value] = await db.query(query);
    const result = {
      result: value,
    };
    return result;
  } catch (ex) {
    const obj = {
      error: "some internal error",
    };
    return obj;
  }
}

export async function getParticularUser(user) {
  try {
    const emailId = user.emailId;
    const query = `select id,emailId,username from users where emailId=?`;
    const [value] = await db.query(query, emailId);
    if (value.length == 0) {
      const obj = {
        nouser: "no user exits",
      };
      return obj;
    }
    const result = {
      result: value,
    };
    return result;
  } catch (ex) {
    const obj = {
      error: "some internal server error",
    };
  }
}
