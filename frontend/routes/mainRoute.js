const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const isAuthenticated = require('../middleware/auth');
const isAdminAuthenticated = require('../middleware/adminAuth'); // Middleware to check if admin is authenticated


router.get('/', mainController.getHomePage);
router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.loginUser);
router.get('/register', mainController.getRegisterPage);
router.post('/register', mainController.registerUser);
router.get('/profile', isAuthenticated, mainController.getProfilePage); // Protect this route
router.post('/profile/avatar', isAuthenticated, mainController.updateAvatar); // Protect this route
router.get('/favorites', isAuthenticated, mainController.getFavoritesPage); // Protect this route
router.get('/admin', isAuthenticated, mainController.getAdminPage); // Protect this route
router.get('/logout', mainController.getLogout); // Add logout route
router.get('/start-discussion', isAuthenticated, mainController.getStartDiscussionPage); // New route for starting a discussion
router.get('/error', mainController.getErrorPage);

module.exports = router;
