const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product-controller');
const { authenticateToken } = require('../jwt/jwt-authenticate');
const { checkUser } = require('../utils');
const { upload } = require('../middlewares/multer');
const { productValidationRules } = require('../validations/product_validation');

// Middleware functions for both Authn and Authz to be used only for certain routes
const requireAuth = [authenticateToken, checkUser];

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', requireAuth, upload.array('image'), productValidationRules, ProductController.createProduct);
router.put('/:id', requireAuth, upload.array('image'), ProductController.updateProductById);
router.delete('/:id', requireAuth, ProductController.deleteProductById);

module.exports = router;
