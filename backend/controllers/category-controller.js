const { Category } = require("../models");

class CategoryController {
  static async allCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving categories.' });
    }
  }

  static async getCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findOne({ where: { id } });
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Category not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while retrieving the category.' });
    }
  }

  static async createCategory(req, res) {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the category.' });
    }
  }

  static async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedRows = await Category.update({ name }, { where: { id } });
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Category updated successfully.' });
      } else {
        res.status(404).json({ message: 'Category not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the category.' });
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const deletedRows = await Category.destroy({ where: { id } });
      if (deletedRows > 0) {
        res.status(200).json({ message: 'Category deleted successfully.' });
      } else {
        res.status(404).json({ message: 'Category not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the category.' });
    }
  }
}

module.exports = CategoryController;