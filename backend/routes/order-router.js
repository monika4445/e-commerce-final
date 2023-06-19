const express = require('express');
const router = express.Router();
const { OrderController } = require('../controllers/order-controller');

//router.post('/createOrder', OrderController.createOrder);
router.post('/createOrderPayment', OrderController.orderPayment);
router.get('/orders', OrderController.getAllOrders);
router.get('/order/:id', OrderController.getOrderById);


module.exports = router
