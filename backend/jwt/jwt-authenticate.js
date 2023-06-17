const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;


function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)
  
	jwt.verify(token, SECRET, (err, user) => {
	  if (err) {
		console.error(err);
		return res.sendStatus(403)
	  }
	  req.user = user
	  if(user.is_verified === 1){
		next()
	  }
	  else{
		return res.sendStatus(401)
	  }
	})
  }

module.exports = {
    authenticateToken
}