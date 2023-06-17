const { Order, CartItem, Product } = require('../models');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

class OrderController {
  static async createOrder(req, res) {
    try {
      const { cartId, total, products } = req.body;

      const order = await Order.create({
        cartId,
        total,
        products,
      });

      const cartItems = await CartItem.findAll({ where: { productId: products.map(p => p.productId) } });

      for (const cartItem of cartItems) {
        const matchingProduct = await Product.findByPk(cartItem.productId);
        const { quantity } = cartItem;

        let updatedQuantity = matchingProduct.quantity - quantity;

        if (updatedQuantity < 0) {
          updatedQuantity = 0;
        }

        await Product.update({ quantity: updatedQuantity }, { where: { id: matchingProduct.id } });
      }

      await CartItem.destroy({ where: { cartId } });

      res.status(201).json({ message: 'Order created successfully.', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the order.' });
    }
  }
  
  static async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving orders.' });
    }
  }
  
  static async getOrderById(req, res) {
    const { orderId } = req.params;
    try {
      const order = await Order.findOne({ where: { id: orderId } });
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Order not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving the order.' });
    }
  }
  
  static async orderPayment(req, res) {
    const { token, cartId, products } = req.body;

    try {
      const cartItems = await CartItem.findAll({ where: { productId: products.map(p => p.productId) }, include: Product });

      const total = cartItems.reduce((acc, item) => acc + item.Product.price, 0);

      stripe.customers
        .create({
          email: token.email,
          source: token.id,
        })
        .then((customer) =>
          stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            customer: customer.id,
          })
        )
        .then(async (charge) => {
          await CartItem.destroy({ where: { cartId } });
          await Order.create({
            cartId,
            total,
            products,
          });
        });

      for (const cartItem of cartItems) {
        const matchingProduct = await Product.findByPk(cartItem.productId);
        const { quantity } = cartItem;

        let updatedQuantity = matchingProduct.quantity - quantity;

        if (updatedQuantity < 0) {
          updatedQuantity = 0;
        }

        await Product.update({ quantity: updatedQuantity }, { where: { id: matchingProduct.id } });
      }

      res.status(201).json({ message: 'Order placed successfully.' });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ message: 'An error occurred while processing the payment.' });
    }
  }
}

module.exports = OrderController;
