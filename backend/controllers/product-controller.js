const { Product, Category, Image } = require("../models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

class ProductController {
  static async allProducts(req, res) {
    try {
      const page = req.query.page;
      const pageSize = req.query.pageSize;

      const offset = (page - 1) * pageSize;

      const products = await Product.findAll({
        include: [{ model: Image }, { model: Category }],
        offset,
        limit: pageSize,
      });

      const totalCount = await Product.count();
      const totalPages = Math.ceil(totalCount / pageSize);

      res.status(201).json({ products, totalPages });
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ message: "Failed to retrieve products" });
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({
        where: { id },
        include: [{ model: Image }, { model: Category }],
      });
      res.status(201).json(product);
    } catch (error) {
      console.error("Error retrieving product:", error);
      res.status(500).json({ message: "Failed to retrieve product" });
    }
  }

  static async createProduct(req, res) {
    const { name, price, description, quantity, categoryId } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }
      const newProduct = await Product.create({
        name,
        categoryId,
        price,
        description,
        quantity,
      });
      const images = req.files.map((file) => {
        return {
          fileName: file.filename,
          productId: newProduct.id,
        };
      });
      await Image.bulkCreate(images);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  }

  static async updateProduct(req, res) {
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
        console.log("New File:", files);

        const imgs = files.map((file) => {
          return {
            productId: id,
            fileName: file.filename,
          };
        });
        const newImage = await Image.bulkCreate(imgs);

        console.log("New Image:", newImage);

        const product = await Product.findByPk(id);
        await product.addImage(newImage);
      }

      await Product.update(
        { name, price, description, quantity, categoryId },
        { where: { id } }
      );

      const updatedProduct = await Product.findByPk(id);

      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  }

  static async deleteProduct(req, res) {
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

      res
        .status(200)
        .json({ message: "Product and associated images deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  }
}

module.exports = ProductController;
