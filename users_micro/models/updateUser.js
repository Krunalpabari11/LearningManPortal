import dotenv from "dotenv";
import { getParticularUser } from "../models/getAllUsers.js";
dotenv.config();
import db from "../DBconnection.js";

export default async function updateUser(data) {
  const { username, emailId } = data;
  const updateQuery = `
        UPDATE users
        SET  username=?
        WHERE emailId = ?;
      `;

  try {
    const rows = await db.query(updateQuery, [username, emailId]);
    const result = { transactionInfo: rows };
    return result;
  } catch (e) {
    let result = { error: e };
    return result;
  }
  // function (err, results) {
  //   if (err) {
  //     return { error: "Failed to update user", status: 500 };
  //   } else if (results.affectedRows === 0) {
  //     return { error: "User not found", status: 404 };
  //   } else {
  //     getUsers(username).then((data) => {
  //       if (data.error) {
  //         return {
  //           error: data.error,
  //           status: 404,
  //         };
  //       } else {
  //         return { result: data.result, status: 200 };
  //       }
  //     });
  //   }
  // }
}

function getUsers(username) {
  getParticularUser(username).then((data) => {
    return data;
  });
}
