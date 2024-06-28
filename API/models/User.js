const bcrypt = require('bcrypt');
const db = require('../config/database');

class User {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users', (err, results) => {
        if (err) {
          console.log('Erreur dans User.getAll:', err);
          return reject(err);
        }
        console.log('Résultats de User.getAll:', results);
        resolve(results);
      });
    });
  }

  static getById(userID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE UserID = ?', [userID], (err, results) => {
        if (err) {
          console.log(`Erreur dans User.getById pour userID ${userID}:`, err);
          return reject(err);
        }
        console.log(`Résultat de User.getById pour userID ${userID}:`, results[0]);
        resolve(results[0]);
      });
    });
  }

  static getByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
        if (err) {
          console.log(`Erreur dans User.getByEmail pour email ${email}:`, err);
          return reject(err);
        }
        console.log(`Résultat de User.getByEmail pour email ${email}:`, results[0]);
        resolve(results[0]);
      });
    });
  }

  static async create(userData) {
    try {
      console.log('Création d\'un utilisateur avec les données:', userData);
      const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password
      userData.password = hashedPassword;

      return new Promise((resolve, reject) => {
        db.query('INSERT INTO Users SET ?', userData, (err, results) => {
          if (err) {
            console.log('Erreur dans User.create:', err);
            return reject(err);
          }
          console.log('Résultats de User.create:', results);
          resolve(results);
        });
      });
    } catch (err) {
      console.log('Erreur dans User.create lors du hachage:', err);
      throw err;
    }
  }

  static update(userID, userData) {
    return new Promise((resolve, reject) => {
      console.log(`Mise à jour de l'utilisateur avec userID ${userID} et les données:`, userData);
      db.query('UPDATE Users SET ? WHERE UserID = ?', [userData, userID], (err, results) => {
        if (err) {
          console.log(`Erreur dans User.update pour userID ${userID}:`, err);
          return reject(err);
        }
        console.log(`Résultats de User.update pour userID ${userID}:`, results);
        resolve(results);
      });
    });
  }

  static delete(userID) {
    return new Promise((resolve, reject) => {
      console.log(`Suppression de l'utilisateur avec userID ${userID}`);
      db.query('DELETE FROM Users WHERE UserID = ?', [userID], (err, results) => {
        if (err) {
          console.log(`Erreur dans User.delete pour userID ${userID}:`, err);
          return reject(err);
        }
        console.log(`Résultats de User.delete pour userID ${userID}:`, results);
        resolve(results);
      });
    });
  }

  static async login(email, password) {
    return new Promise((resolve, reject) => {
      console.log(`Tentative de connexion pour l'email ${email}`);
      db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          console.log('Erreur dans User.login lors de la requête DB:', err);
          return reject(err);
        }
        if (results.length === 0) {
          console.log('Erreur dans User.login: Utilisateur non trouvé');
          return reject(new Error('Utilisateur non trouvé'));
        }

        const user = results[0];
        console.log(`User.login a trouvé l'utilisateur:`, user);

        const isMatch = await bcrypt.compare(password, user.Password); // Compare hashed password
        console.log(`Résultat de la comparaison de mot de passe pour l'email ${email}:`, isMatch);

        if (!isMatch) {
          console.log('Erreur dans User.login: Identifiants invalides');
          return reject(new Error('Identifiants invalides'));
        }
        resolve(user);
      });
    });
  }
}

module.exports = User;
