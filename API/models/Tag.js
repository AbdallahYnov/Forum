const db = require('../config/database');

class Tag {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Tags', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(tagID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Tags WHERE TagID = ?', [tagID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(tagData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Tags SET ?', tagData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(tagID, tagData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Tags SET ? WHERE TagID = ?', [tagData, tagID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(tagID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Tags WHERE TagID = ?', [tagID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Tag;
