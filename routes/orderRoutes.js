const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController')


router.get('/orders', orderController.getOrders)

router.get('/earnings', orderController.TotalEarningsOrders)

router.get('/all/:pid/:id',orderController.ordersOfType)

router.get('/price/:pid/:id',orderController.PriceOfType)

module.exports=router