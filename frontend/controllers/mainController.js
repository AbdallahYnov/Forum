const axios = require('axios');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const User = require('../../API/models/User'); // Assurez-vous d'importer le modèle User

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars'); // Ensure this directory exists
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
        res.render('error', { message: "Erreur interne du serveur" });
    }
};


// Page d'inscription
exports.getRegisterPage = (req, res) => {
    res.render('register', {
        title: "Register",
        stylesheets: ['/css/register.css'], // Include necessary styles
        scripts: [], // Add necessary scripts
        isAuthenticated: !!req.session.userId // Pass authentication status
    });
};

// Enregistrer un utilisateur
exports.registerUser = [
    upload.single('avatar'), // Handle file upload
    async (req, res) => {
        try {
            const userData = req.body;
            if (req.file) {
                userData.avatar = req.file.filename; // Add the file name to the user data
            }
            await axios.post('http://localhost:3000/users/register', userData);
            res.redirect('/login');
        } catch (error) {
            res.render('error', { message: "Erreur interne du serveur" });
        }
    }
];

// Page de connexion
exports.getLoginPage = (req, res) => {
    res.render('login', {
        title: "Login",
        stylesheets: ['/css/login.css'], // Include necessary styles
        scripts: [], // Add necessary scripts
        isAuthenticated: !!req.session.userId // Pass authentication status
    });
};

// Connecter un utilisateur
exports.loginUser = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/users/login', req.body);
        const { user } = response.data;
        req.session.userId = user.UserID; // Store user ID in session
        res.redirect('/profile');
    } catch (error) {
        res.render('error', { message: error.message });
    }
};

// Déconnexion de l'utilisateur
exports.getLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
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
            scripts: [], // Add necessary scripts
            isAuthenticated: !!req.session.userId // Pass authentication status
        });
    } catch (error) {
        console.log('Erreur lors de la récupération du profil utilisateur:', error);
        res.render('error', { message: "Erreur interne du serveur" });
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
        res.render('error', { message: "Erreur interne du serveur" });
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
            scripts: [], // Add necessary scripts
            isAuthenticated: !!req.session.userId // Pass authentication status
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
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
        scripts: [], // Add necessary scripts
        isAuthenticated: !!req.session.userId // Pass authentication status
    });
};

// Page d'erreur
exports.getErrorPage = (req, res) => {
    res.render('error', {
        title: "Error",
        stylesheets: ['/css/error.css'], // Include necessary styles
        scripts: [], // Add necessary scripts
        isAuthenticated: !!req.session.userId // Pass authentication status
    });
};

exports.getStartDiscussionPage = (req, res) => {
    res.render('start-discussion', {
        title: "Démarrer une discussion",
        stylesheets: ['/css/start-discussion.css'],
        scripts: ['/js/chat.js'],
        isAuthenticated: !!req.session.userId // Pass authentication status
    });
};

