const { body } = require('express-validator');

const productValidationRules = [
  body('name')
    .notEmpty().withMessage('Product name is required.'),
  
  body('price')
    .notEmpty().withMessage('Price is required.')
    .isNumeric().withMessage('Price must be a valid number.'),
  
  body('description')
    .notEmpty().withMessage('Product description is required.'),
  
  body('quantity')
    .notEmpty().withMessage('Quantity is required.')
    .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer.'),
];

module.exports = { productValidationRules };
