const login=require('../controller/login_controller')
import express from 'express'
const router=express.Router();

router.post('/',login.login())

module.exports=router