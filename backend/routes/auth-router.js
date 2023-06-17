const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../jwt/jwt-authenticate');
const AuthController = require('../controllers/auth-controller');

router.post('/login', AuthController.logValidationRules, AuthController.login);
router.post('/register', AuthController.regValidationRules, AuthController.register);
router.get('/verify/:token', AuthController.verify)
router.get('/users', authenticateToken, AuthController.allUsers);


module.exports = router;
