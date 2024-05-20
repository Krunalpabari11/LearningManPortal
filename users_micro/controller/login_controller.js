import authenticate from '../authenticateToken.js'
import  validate  from '../models/loginuser.js'
// const {validate} =require('../models/loginuser')
import dotenv 
from 'dotenv'

dotenv.config()
import express from 'express'
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser'
const app=express()
app.use(cookieParser())
// app.use(authenticateToken)
function login(req,res){

    const data={
        username:req.body.username,
        password:req.body.password
    }
   validate(data).then(status=>{
        
        if(status==404)
            {
                res.json({error:"user not found"})
            }
        if(status==401)
            {
                res.json({error:"password doesnt match"})
            }
        if(status==500)
            {
                res.json("{internal server error}")
            }
        if(status==200)
            {   
                const obj={
                    username:req.body.username,
                    time:new Date().toISOString()
                }
               
                const expire=15*24*60*60
                const token=jwt.sign(obj,process.env.secrret_key,{expiresIn:expire});
                
                res.cookie('token',token,{httpOnly:true,maxAge:expire})
                res.json("{login successful}")
            }
    }).catch(err=>{
        res.json({error:"internal server error"})
    })


}
export default login