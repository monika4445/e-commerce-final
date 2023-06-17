const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET = process.env.JWT_SECRET;
function generateAccessToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: 3600 });

}

module.exports = {
    generateAccessToken
}
