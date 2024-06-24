const axios = require('axios');

// Page d'accueil
exports.getHomePage = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/');
        const discussions = response.data;
        res.render('index', {
            title: "Accueil",
            discussions,
            stylesheets: ['/css/style.css'], // Incluez les styles nécessaires
            scripts: [] // Ajoutez les scripts nécessaires si besoin
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Page de connexion
exports.getLoginPage = (req, res) => {
    res.render('login', {
        title: "Connexion",
        stylesheets: ['/css/style.css'],
        scripts: []
    });
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const response = await axios.post('http://localhost:4000/auth/login', { username, password });
        const user = response.data;
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        res.render('login', { message: "Erreur de connexion", stylesheets: ['/css/style.css'], scripts: [] });
    }
};

// Page d'inscription
exports.getRegisterPage = (req, res) => {
    res.render('register', {
        title: "Inscription",
        stylesheets: ['/css/style.css'],
        scripts: []
    });
};

exports.registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        await axios.post('http://localhost:4000/auth/register', { username, password, email });
        res.redirect('/login');
    } catch (error) {
        res.render('register', { message: "Erreur d'inscription", stylesheets: ['/css/style.css'], scripts: [] });
    }
};

// Page du profil
exports.getProfilePage = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.redirect('/login');
        }
        res.render('profile', {
            title: "Profil",
            user,
            stylesheets: ['/css/style.css'],
            scripts: []
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Page des favoris
exports.getFavoritesPage = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.redirect('/login');
        }
        const response = await axios.get(`http://localhost:4000/users/${user.id}/favorites`);
        const favorites = response.data;
        res.render('favorites', {
            title: "Favoris",
            favorites,
            stylesheets: ['/css/style.css'],
            scripts: []
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Page d'administration
exports.getAdminPage = async (req, res) => {
    try {
        // Ajoutez des vérifications d'accès admin si nécessaire
        res.render('admin', {
            title: "Admin",
            stylesheets: ['/css/style.css'],
            scripts: []
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Gestion des erreurs
exports.getErrorPage = (req, res) => {
    res.render('error', {
        title: "Erreur",
        message: "Quelque chose s'est mal passé. Veuillez réessayer plus tard.",
        stylesheets: ['/css/style.css'],
        scripts: []
    });
};
