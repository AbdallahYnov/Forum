const db = require('../config/database');

class ThreadTag {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ThreadTags', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getByThreadId(threadID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM ThreadTags WHERE ThreadID = ?', [threadID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static create(threadTagData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO ThreadTags SET ?', threadTagData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(threadID, tagID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM ThreadTags WHERE ThreadID = ? AND TagID = ?', [threadID, tagID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = ThreadTag;
