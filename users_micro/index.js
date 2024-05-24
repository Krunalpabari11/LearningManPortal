// const createUserRouter=require('./Router/createUserRouter')
// const loginRouter=require('./Router/loginRouter')
// const getrouter=require('./Router/getAllUserRouter')
import authenticate from './authenticateToken.js'
import express from 'express'
import user from './controller/user_controller.js';
import login from "./controller/login_controller.js";
import { getAllUsers } from "./controller/getAllUsers_controller.js";
import { getPartiuser } from "./controller/getAllUsers_controller.js";
import cookieParser from 'cookie-parser';
const app=express();
app.use(express.json());
app.use(cookieParser())
// Body parsing middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.post('/',user)
app.post('/login',authenticate,login)
app.get('/getuser',authenticate,getAllUsers)
app.get('/getuser/:username',authenticate,getPartiuser)

app.listen(5000,()=>{
    console.log("listening")
})