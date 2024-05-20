import dotenv from 'dotenv'
import mysql from 'mysql'
import bycrpt from 'bcrypt'
// const bycrpt=require('bcrypt')
import db from '../DBconnection.js'
dotenv.config()
export  function createTable(){
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role int NOT NULL,
      org_id int NOT NULL
    )`;
    db.query(query,(err,result)=>{
        if(result){
            console.log("created")
        }
        if(err)
            {
                console.log(`not created${err}`)
            }
    })
}
 export  function insertUser(req,res){
    const username=req.body.username
    const password=req.body.password
    const role=req.body.role
    const org_id=req.body.org_id
    const salt=10
    bycrpt.hash(password,salt,(err,hash)=>{
        if(err){
            return res.json("{internal server error}")
        }
        const obj={
            username:username,
            password:hash,
            role:role,
            org_id:org_id
        }
        const query='insert into users set ?'
        db.query(query,obj,(err,result)=>{
            if(err)
                {
                    res.json("{internal server error}")
                }
            if(result)
                {
                    res.json("{user created successfully}")
                }
        })
    })
}
