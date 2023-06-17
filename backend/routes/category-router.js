const express = require('express');
const router = express.Router();
const { CategoryController } = require('../controllers/category-controller');


const { authenticateToken } = require('../jwt/jwt_authenticate');

router.get('/categories', CategoryController.allCategories);
router.get('/category/:id', CategoryController.getCategory);
router.post('/createCategory', authenticateToken, CategoryController.createCategory);
router.put('/updateCategory/:id', authenticateToken, CategoryController.updateCategory);
router.delete('/deleteCategory/:id', authenticateToken, CategoryController.deleteCategory);


module.exports = router;
