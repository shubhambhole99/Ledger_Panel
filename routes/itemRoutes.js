const express = require('express')
const router = express.Router()
const itemController = require('../controller/itemController')


router.post('/create', itemController.createItem)



module.exports=router