const express = require('express');
const router = express.Router();
const { CartItemsController } = require('../controllers/cart-items-controller');

router.get("/cartItems", CartItemsController.allCartItems);
router.get("/cartItem/:id", CartItemsController.getCartItem);
router.put("/updateCartItem/:id", CartItemsController.updateCartItem);
router.delete("/deleteCartItem/:id", CartItemsController.deleteCartItem);
router.post("/cartCartItem", CartItemsController.createCartAndCartItem);
router.put("/cartItem/increment/:id", CartItemsController.incrementCartItem);
router.put("/cartItem/decrement/:id", CartItemsController.decrementCartItem);

module.exports = router
