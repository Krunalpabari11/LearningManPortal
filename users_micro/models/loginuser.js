import bcrypt from "bcrypt";
import db from "../DBconnection.js";

export default async function validate(data) {
  try {
    const emailId = data.emailId;
    const password = data.password;

    const query = `SELECT password FROM users WHERE emailId = ?`;
    const [rows] = await db.query(query, [emailId]);
    if (!rows || rows.length === 0) {
      return 404; // User not found
    }

    const hashedPassword = rows[0].password;
    const match = await bcrypt.compare(password, hashedPassword);

    if (match) {
      return 200; // Successful login
    } else {
      return 401; // Incorrect password
    }
  } catch (err) {
    // console.error(err);
    return 500; // Internal server error
  }
}
