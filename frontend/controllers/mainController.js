const axios = require('axios');
const multer = require('multer');
const path = require('path');

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
        const response = await axios.get('http://localhost:3000/discussions');
        const discussions = response.data;
        res.render('index', {
            title: "Accueil",
            discussions,
            stylesheets: ['/css/style.css'], // Include necessary styles
            scripts: [] // Add necessary scripts
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Register page
exports.getRegisterPage = (req, res) => {
    res.render('register', {
        title: "Register",
        stylesheets: ['/css/register.css'], // Include necessary styles
        scripts: [] // Add necessary scripts
    });
};

// Register user
exports.registerUser = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/users/register', req.body);
        res.redirect('/login');
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Login page
exports.getLoginPage = (req, res) => {
    res.render('login', {
        title: "Login",
        stylesheets: ['/css/login.css'], // Include necessary styles
        scripts: [] // Add necessary scripts
    });
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/users/login', req.body);
        res.redirect('/profile');
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Profile page
exports.getProfilePage = async (req, res) => {
    const userId = req.session.userId; // Assuming user ID is stored in session
    try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const user = response.data;
        res.render('profile', {
            title: "Profile",
            user,
            stylesheets: ['/css/profile.css'], // Include necessary styles
            scripts: [] // Add necessary scripts
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Favorites page
exports.getFavoritesPage = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/favorites');
        const favorites = response.data;
        res.render('favorites', {
            title: "Favorites",
            favorites,
            stylesheets: ['/css/favorites.css'], // Include necessary styles
            scripts: [] // Add necessary scripts
        });
    } catch (error) {
        res.render('error', { message: "Erreur interne du serveur" });
    }
};

// Admin page
exports.getAdminPage = (req, res) => {
    res.render('admin', {
        title: "Admin",
        stylesheets: ['/css/admin.css'], // Include necessary styles
        scripts: [] // Add necessary scripts
    });
};

// Error page
exports.getErrorPage = (req, res) => {
    res.render('error', {
        title: "Error",
        stylesheets: ['/css/error.css'], // Include necessary styles
        scripts: [] // Add necessary scripts
    });
};
