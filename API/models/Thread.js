const db = require('../config/database');

class Thread {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Threads', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(threadID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Threads WHERE ThreadID = ?', [threadID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(threadData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Threads SET ?', threadData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(threadID, threadData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Threads SET ? WHERE ThreadID = ?', [threadData, threadID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(threadID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Threads WHERE ThreadID = ?', [threadID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Thread;
