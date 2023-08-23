const express = require('express')
const router = express.Router()
const expenseController = require('../controller/expenseController')


router.post('/create', expenseController.addExpenseAndCreateItems)



module.exports=router