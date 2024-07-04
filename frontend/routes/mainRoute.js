const express = require('express');
const router = express.Router();
const userController = require('../../API/controllers/userController'); // Ajuster le chemin si nécessaire
const mainController = require('../controllers/mainController');
const isAuthenticated = require('../middleware/auth');
const isAdminAuthenticated = require('../middleware/adminAuth'); // Middleware pour vérifier si l'admin est authentifié

router.get('/', mainController.getHomePage);
router.get('/login', mainController.getLoginPage);
router.post('/login', userController.loginUser);
router.get('/register', mainController.getRegisterPage);
router.post('/register', userController.createUser);
router.get('/profile', isAuthenticated, mainController.getProfilePage); // Protéger cette route
router.post('/profile/avatar', isAuthenticated, mainController.updateAvatar); // Protéger cette route
router.get('/favorites', isAuthenticated, mainController.getFavoritesPage); // Protéger cette route
router.get('/admin', isAdminAuthenticated, mainController.getAdminPage); // Protéger cette route
router.get('/logout', userController.logoutUser); // Ajouter la route de déconnexion
router.get('/start-discussion', isAuthenticated, mainController.getStartDiscussionPage); // Nouvelle route pour démarrer une discussion
router.get('/error', mainController.getErrorPage);

module.exports = router;
