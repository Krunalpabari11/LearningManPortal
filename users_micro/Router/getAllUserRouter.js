const getAllUsers=require('../controller/getAllUsers_controller')
import express from 'express'
const router=express.Router();

router.get('/',getAllUsers.getAllUsers)
router.get('/:username',getAllUsers.user)

module.exports=router