const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'forum_user',
  password: 'notrepremierforum',
  database: 'forum_b1'
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
