// const {createTable,insertUser} =require('../models/createuser')
import {createTable, insertUser} from '../models/createuser.js'
import express from 'express'
const app=express();
// app.use(authenticateToken)


export default  async function user(req,res){
    try{
   await createTable();
    
   await insertUser(req,res);
    }
    catch(ex)
    {
        res.status(500).json({error:"some internal error"})
    }
}

