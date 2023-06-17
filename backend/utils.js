const jwt = require('jsonwebtoken');

function checkUser(req,res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    const decoded = jwt.decode(token);
    //console.log(decoded);
    const is_admin = decoded.is_admin;

    if(is_admin === 0){
      console.log(error.message);
      res.status(403);
    }
    next();
  }

  module.exports = {
    checkUser
}