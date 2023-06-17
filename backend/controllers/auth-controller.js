const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../jwt/jwt-generate');
const { sendEmail } = require('../mailers/confirm-email');
require('dotenv').config();
const { validationResult, body } = require('express-validator');

const SECRET = process.env.SECRET;
const PORT = process.env.PORT;

const { User } = require("../models");

class AuthController {
  static regValidationRules = [
    body("userName").isLength({ min: 6 }).withMessage("Username must be at least 6 characters long").notEmpty().withMessage("Username cannot be empty"),
    body("email").notEmpty().withMessage('Email is required.').isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  ];

  static logValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ];

  static async register(req, res) {
    const { userName, email, password } = req.body;
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: "A user account with this email already exists" });
      }

      const newUser = {
        userName,
        email,
        password: hashedPassword,
      };

      User.create(newUser)
        .then((user) => {
          const token = generateAccessToken(email, user.role, user.id);
          const link = `http://localhost:${PORT}/verify?token=${token}`;
          sendEmail(email, link);
          res.status(201).json(user);
        })
        .catch(() => {
          res.status(500).json({ error: "Failed to create a new user" });
        });
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "Invalid email" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = generateAccessToken(email, user.role, user.id);
        res.send({
          status: "Logged in",
          jwt: token,
          role: user.role,
          userName: user.userName,
        });
      } else if (user.is_verified === 0) {
        return res.status(400).json({ error: "Account not verified. Please complete the verification process." });
      } else {
        return res.status(400).json({ error: "Invalid password" });
      }
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async allUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(201).json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  static async verify(req, res) {
    try {
      const token = req.query.token;
      const decoded = jwt.verify(token, SECRET);

      await User.update({ userVerified: true }, { where: { email: decoded.email } });

      res.status(200).json({ message: "Account verified" });
    } catch (err) {
      console.log('Token verification error:', err);
      res.status(500).json({ error: "Failed to verify account" });
    }
  }
}

module.exports = AuthController;
