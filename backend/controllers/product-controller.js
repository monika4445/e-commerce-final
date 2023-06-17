const { Product, Category, Image } = require("../models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          { model: Image },
          { model: Category }
        ]
      });
      res.status(200).json({ success: true, message: "Products fetched successfully", data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({
        where: { id },
        include: [
          { model: Image },
          { model: Category }
        ]
      });
      res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch product", error: error.message });
    }
  }

  static async createProduct(req, res) {
    const { name, price, description, quantity, categoryId } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array()[0].msg });
      }

      const newProduct = await Product.create({
        name,
        categoryId,
        price,
        description,
        quantity,
      });

      const images = req.files.map((file) => ({
        fileName: file.filename,
        productId: newProduct.id,
      }));

      await Image.bulkCreate(images);

      res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create product", error: error.message });
    }
  }

  static async updateProductById(req, res) {
    const { id } = req.params;
    const { name, price, description, quantity, categoryId } = req.body;
    const { files } = req;

    try {
      const images = await Image.findAll({ where: { productId: id } });

      for (const image of images) {
        const filePath = path.join(
          __dirname,
          "..",
          "static",
          "images",
          image.fileName
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await Image.destroy({ where: { productId: id } });

      if (files) {
        const imgs = files.map((file) => ({
          productId: id,
          fileName: file.filename,
        }));

        const newImage = await Image.bulkCreate(imgs);
        const product = await Product.findByPk(id);
        await product.addImage(newImage);
      }

      await Product.update(
        { name, price, description, quantity, categoryId },
        { where: { id } }
      );

      res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
    }
  }

  static async deleteProductById(req, res) {
    const { id } = req.params;
    try {
      const images = await Image.findAll({ where: { productId: id } });

      for (const image of images) {
        const filePath = path.join(
          __dirname,
          "..",
          "static",
          "images",
          image.fileName
        );
        fs.unlinkSync(filePath);
      }

      await Image.destroy({ where: { productId: id } });
      await Product.destroy({ where: { id } });

      res.status(200).json({ success: true, message: "Product and associated images deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
    }
  }
}

module.exports = ProductController;
