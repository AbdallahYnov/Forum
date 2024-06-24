const db = require('../config/database');

class Message {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Messages', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(messageID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Messages WHERE MessageID = ?', [messageID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(messageData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Messages SET ?', messageData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(messageID, messageData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Messages SET ? WHERE MessageID = ?', [messageData, messageID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(messageID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Messages WHERE MessageID = ?', [messageID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Message;
