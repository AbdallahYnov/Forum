const db = require('../config/database');

class Category {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Categories', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(categoryID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Categories WHERE CategoryID = ?', [categoryID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(categoryData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Categories SET ?', categoryData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(categoryID, categoryData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Categories SET ? WHERE CategoryID = ?', [categoryData, categoryID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(categoryID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Categories WHERE CategoryID = ?', [categoryID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Category;
