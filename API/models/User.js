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

  static create(userData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Users SET ?', userData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
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
}

module.exports = User;
