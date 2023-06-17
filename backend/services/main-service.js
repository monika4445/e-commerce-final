const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

class MainService {
  static async home(token) {
    const decoded = jwt.decode(token);
    const userEmail = decoded.email;

    return new Promise((resolve, reject) => {
      db.get("SELECT is_verified FROM users WHERE email=?", [userEmail], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(`User with email ${userEmail} not found`);
        } else if (row.is_verified === 0) {
          resolve("User is not verified");
        } else {
          resolve(`Welcome, ${userEmail}!`);
        }
      });
    });
  }

}

module.exports = MainService;
