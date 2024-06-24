const db = require('../config/database');

class Image {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Images', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(imageID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Images WHERE ImageID = ?', [imageID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(imageData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Images SET ?', imageData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(imageID, imageData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Images SET ? WHERE ImageID = ?', [imageData, imageID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(imageID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Images WHERE ImageID = ?', [imageID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Image;
