const db = require('../config/database');

class Favorite {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Favorites', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getByUserId(userID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Favorites WHERE UserID = ?', [userID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(favoriteData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Favorites SET ?', favoriteData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(userID, postID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Favorites WHERE UserID = ? AND PostID = ?', [userID, postID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Favorite;
