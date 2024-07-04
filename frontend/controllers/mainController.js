const axios = require('axios');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads (if needed for other file uploads)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Page d'accueil
exports.getHomePage = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/categories');
        const discussions = response.data;
        res.render('index', {
            title: "Accueil",
            discussions,
            stylesheets: ['/css/style.css', '/css/header_footer.css', '/css/style.css'], // Include necessary styles
            scripts: [], // Add necessary scripts
            isAuthenticated: !!req.session.userId // Pass authentication status
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur", title: "Error" });
    }
};

// Page d'inscription
exports.getRegisterPage = (req, res) => {
    res.render('register', {
        title: "Register",
        stylesheets: ['/css/register.css'], // Include necessary styles
        scripts: [],
        isAuthenticated: !!req.session.userId // Pass authentication status
    });
};

// Page de connexion
exports.getLoginPage = (req, res) => {
    res.render('login', {
        title: "Login",
        stylesheets: ['/css/login.css'], // Include necessary styles
        scripts: [],
        isAuthenticated: !!req.session.userId // Pass authentication status
    });
};

// Page de profil
exports.getProfilePage = async (req, res) => {
    const userId = req.session.userId; // Assuming user ID is stored in session
    if (!userId) {
        console.log('Aucun ID utilisateur trouvé dans la session, redirection vers la page de connexion');
        return res.redirect('/login');
    }
    try {
        console.log(`Tentative de récupération du profil utilisateur pour l'ID ${userId}`);
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const user = response.data;
        console.log('Profil utilisateur récupéré avec succès:', user);
        res.render('profile', {
            title: "Profil",
            user,
            stylesheets: ['/css/profile.css', '/css/header_footer.css'], // Include necessary styles
            scripts: [],
            isAuthenticated: !!req.session.userId // Pass authentication status
        });
    } catch (error) {
        console.log('Erreur lors de la récupération du profil utilisateur:', error);
        res.render('error', { message: "Erreur interne du serveur", title: "Error" });
    }
};

exports.updateAvatar = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        console.log('Aucun ID utilisateur trouvé dans la session, redirection vers la page de connexion');
        return res.redirect('/login');
    }
    const avatarPath = req.body.avatar;
    try {
        console.log(`Tentative de mise à jour de l'avatar pour l'utilisateur avec l'ID ${userId}`);
        await axios.put(`http://localhost:3000/users/${userId}/avatar`, { avatarPath });
        console.log('Avatar mis à jour avec succès');
        res.redirect('/profile');
    } catch (error) {
        console.log('Erreur lors de la mise à jour de l\'avatar:', error);
        res.render('error', { message: "Erreur interne du serveur", title: "Error" });
    }
};

// Page des favoris
exports.getFavoritesPage = async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login');
    }
    try {
        const response = await axios.get(`http://localhost:3000/favorites/${userId}`);
        const favorites = response.data;
        res.render('favorites', {
            title: "Favorites",
            favorites,
            stylesheets: ['/css/favorites.css'], // Include necessary styles
            scripts: [],
            isAuthenticated: !!req.session.userId // Pass authentication status
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur", title: "Error" });
    }
};

// Page d'administration
exports.getAdminPage = (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login');
    }
    res.render('admin', {
        title: "Admin",
        stylesheets: ['/css/admin.css'], // Include necessary styles
        scripts: [],
        isAuthenticated: !!req.session.userId
    });
};

// Page d'erreur
exports.getErrorPage = (req, res) => {
    res.render('error', {
        title: "Error",
        stylesheets: ['/css/error.css'], // Include necessary styles
        scripts: [],
        isAuthenticated: !!req.session.userId
    });
};

exports.getStartDiscussionPage = (req, res) => {
    res.render('start-discussion', {
        title: "Démarrer une discussion",
        stylesheets: ['/css/start-discussion.css'],
        scripts: ['/js/chat.js'],
        isAuthenticated: !!req.session.userId
    });
};
