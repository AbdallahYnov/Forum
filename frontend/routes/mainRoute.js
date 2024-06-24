const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getHomePage);
router.get('/login', mainController.getLoginPage);
router.post('/login', mainController.loginUser);
router.get('/register', mainController.getRegisterPage);
router.post('/register', mainController.registerUser);
router.get('/profile', mainController.getProfilePage);
router.get('/favorites', mainController.getFavoritesPage);
router.get('/admin', mainController.getAdminPage);
router.get('/error', mainController.getErrorPage);

module.exports = router;
