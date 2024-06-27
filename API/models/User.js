const bcrypt = require('bcrypt');
const db = require('../config/database');

class User {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(userID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE UserID = ?', [userID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static async create(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password
      userData.password = hashedPassword;

      return new Promise((resolve, reject) => {
        db.query('INSERT INTO Users SET ?', userData, (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    } catch (err) {
      throw err;
    }
  }

  static update(userID, userData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Users SET ? WHERE UserID = ?', [userData, userID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(userID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Users WHERE UserID = ?', [userID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static login(email, password) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return reject(new Error('User not found'));

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return reject(err);
          if (!isMatch) return reject(new Error('Invalid credentials'));

          resolve(user);
        });
      });
    });
  }
}

module.exports = User;
