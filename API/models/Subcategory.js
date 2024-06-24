const db = require('../config/database');

class Subcategory {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Subcategories', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(subcategoryID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Subcategories WHERE SubcategoryID = ?', [subcategoryID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(subcategoryData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Subcategories SET ?', subcategoryData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(subcategoryID, subcategoryData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Subcategories SET ? WHERE SubcategoryID = ?', [subcategoryData, subcategoryID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(subcategoryID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Subcategories WHERE SubcategoryID = ?', [subcategoryID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Subcategory;
