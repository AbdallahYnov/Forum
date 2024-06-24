const db = require('../config/database');

class Reaction {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Reactions', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getById(reactionID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Reactions WHERE ReactionID = ?', [reactionID], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(reactionData) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Reactions SET ?', reactionData, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static update(reactionID, reactionData) {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Reactions SET ? WHERE ReactionID = ?', [reactionData, reactionID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static delete(reactionID) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Reactions WHERE ReactionID = ?', [reactionID], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Reaction;
