const db = require('../config/database');

class Post {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Posts', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(postID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Posts WHERE PostID = ?', [postID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(postData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Posts SET ?', postData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(postID, postData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Posts SET ? WHERE PostID = ?', [postData, postID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(postID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Posts WHERE PostID = ?', [postID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Post;
