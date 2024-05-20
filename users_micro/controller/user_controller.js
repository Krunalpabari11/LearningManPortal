// const {createTable,insertUser} =require('../models/createuser')
import {createTable, insertUser} from '../models/createuser.js'
import express from 'express'
const app=express();
// app.use(authenticateToken)


export default function user(req,res){

    createTable();
    
    insertUser(req,res);

}

