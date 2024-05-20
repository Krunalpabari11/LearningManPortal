// const controller=require('../controller/user_controller')
import controller from '../controller/user_controller'
import {user} from '../controller/user_controller.js'
import express from 'express'
const app=express()
const router=express.Router()

router.post('/',user)

export default router