const db = require('../config/database');

class Friend {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Friends', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getByUserId(userID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Friends WHERE UserID1 = ? OR UserID2 = ?', [userID, userID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(friendData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Friends SET ?', friendData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(userID1, userID2) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Friends WHERE UserID1 = ? AND UserID2 = ?', [userID1, userID2], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Friend;
