'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category,{foreignKey:'categoryId'});
      Product.hasMany(models.Image, {foreignKey:'productId'});
      Product.belongsToMany(models.Cart, { through: models.CartItem, foreignKey:'cartId', key:'id' });
      Product.hasMany(models.CartItem, {foreignKey:'productId', key:'id'});
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};