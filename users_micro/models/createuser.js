import dotenv from 'dotenv'
import mysql from 'mysql'
import bycrpt from 'bcrypt'
// const bycrpt=require('bcrypt')
import db from '../DBconnection.js'
dotenv.config()
export async function createTable(){
    try{
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role int NOT NULL,
      org_id int NOT NULL
    )`;
    const result=await db.query(query)
    }
    catch(ex)
    {
        const obj={error:"internal server error"}
        return obj;
    }
}
export async function insertUser(req, res) {
    try {
        const { username, password, role, org_id } = req.body;
        const saltRounds = 10;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const obj = {
            username: username,
            password: hashedPassword,
            role: role,
            org_id: org_id
        };

        const query = 'INSERT INTO users SET ?';
        
        // Use a promise-based query
        const [result] = await db.query(query, obj);
        
        if (result) {
            console.log(obj);
            res.json("{user created successfully}");
        }
    }
catch(exc)
{
    res.status(500).json({error:"some internal server error"})
}
}
