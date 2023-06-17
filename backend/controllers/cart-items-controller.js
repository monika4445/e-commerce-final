const { CartItem, Cart, Product, Image } = require("../models");

class CartItemsController {
  static async allCartItems(req, res) {
    try {
      const cartItems = await CartItem.findAll({
        include: [
          { model: Cart },
          { model: Product }
        ]
      });
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve cart items." });
    }
  }
  
  static async getCartItem(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.findOne({ where: { userId: id } });
      if (cart) {
        const cartItems = await CartItem.findAll({
          where: { cartId: cart.id },
          include: {
            model: Product,
            include: { model: Image }
          }
        });

        for (const cartItem of cartItems) {
          const product = cartItem.Product;

          if (product) {
            const image = await Image.findAll({ where: { productId: product.id } });
            if (image) {
              product.dataValues.Image = image;
            }
          }
        }

        res.status(201).json({ cartItems });
      } else {
        res.status(404).json({ error: "Cart not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve cart item." });
    }
  }
  
  static async updateCartItem(req, res) {
    const { id } = req.params;
    const { cartId, productId, quantity } = req.body;
    try {
      const cartItem = await CartItem.findByPk(id);
      if (cartItem) {
        cartItem.cartId = cartId;
        cartItem.productId = productId;
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json(cartItem);
      } else {
        res.status(404).json({ error: "Cart item not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to update cart item." });
    }
  }
  
  static async createCartAndCartItem(req, res) {
    const { userId, productId, quantity } = req.body;
    try {
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }
      let cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId }
      });
      if (!cartItem) {
        cartItem = await CartItem.create({
          cartId: cart.id,
          productId,
          quantity
        });
      } else {
        cartItem.quantity += quantity;
        await cartItem.save();
      }

      res.json({ cartItem });
    } catch (error) {
      res.status(500).json({ error: "Unable to create cart item." });
    }
  }
  
  static async deleteCartItem(req, res) {
    const { id } = req.params;
    try {
      const cartItem = await CartItem.findOne({ where: { productId: id } });
      if (cartItem) {
        await CartItem.destroy({ where: { productId: id } });
        res.json({ message: "Cart item deleted successfully." });
      } else {
        res.status(404).json({ error: "Cart item not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to delete cart item." });
    }
  }
  
  static async incrementCartItem(req, res) {
    const { id } = req.params;
    try {
      const cartItem = await CartItem.findOne({ where: { productId: id } });
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found." });
      }

      if (cartItem.quantity > 0) {
        await CartItem.update(
          { quantity: cartItem.quantity + 1 },
          { where: { productId: id } }
        );
        const updatedCartItem = await CartItem.findOne({ where: { productId: id } });
        res.json({ cartItem: updatedCartItem });
      } else {
        res.json({ cartItem });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to increment cart item quantity." });
    }
  }
  
  static async decrementCartItem(req, res) {
    const { id } = req.params;
    try {
      const cartItem = await CartItem.findOne({ where: { productId: id } });
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found." });
      }

      if (cartItem.quantity > 1) {
        await CartItem.update(
          { quantity: cartItem.quantity - 1 },
          { where: { productId: id } }
        );
        const updatedCartItem = await CartItem.findOne({ where: { productId: id } });
        res.json({ cartItem: updatedCartItem });
      } else {
        res.json({ cartItem });
      }
    } catch (error) {
      res.status(500).json({ error: "Unable to decrement cart item quantity." });
    }
  }
}

module.exports = CartItemsController;
