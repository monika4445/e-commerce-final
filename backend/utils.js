const jwt = require('jsonwebtoken');

function checkUser(req,res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided.' });
  }
    
  try {
    const decoded = jwt.decode(token);
    const role = decoded.role;

    if (role === 'user') {
      return res.status(403).json({ message: 'Unauthorized access: User role not allowed.' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = {
  checkUser
};
