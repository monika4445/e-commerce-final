const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Authorization token not provided.' });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    if (!user.userVerified) {
      return res.status(401).json({ message: 'User is not verified.' });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken
};
