const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const indexRouter = require('./routes/mainRoute.js');

const app = express();

// Configuration des middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'votre_secret', resave: false, saveUninitialized: true }));

// Configuration du moteur de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuration des fichiers statiques
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Utilisation des routes
app.use('/', indexRouter);

app.get('/blog', (req, res) => {
    res.render('pages/blog');
  });

// Gestion des erreurs
app.use((req, res, next) => {
    res.status(404).render('error', { message: "Page non trouvée" });
});

// Démarrage du serveur
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port http://localhost:${PORT}`);
});

module.exports = app;
