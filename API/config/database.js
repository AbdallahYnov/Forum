const mysql = require('mysql2');

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'forum_user',
  password: 'notrepremierforum', // Remplacez par votre mot de passe MySQL
  database: 'forum_b1'
});

// Connecter à la base de données
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL Database.');
  }
});

module.exports = db;
