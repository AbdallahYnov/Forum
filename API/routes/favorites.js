const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const router = express.Router();

router.get('/', favoriteController.getAllFavorites);
router.get('/user/:userId', favoriteController.getFavoritesByUserId);
router.post('/', favoriteController.createFavorite);
router.delete('/user/:userId/post/:postId', favoriteController.deleteFavorite);

module.exports = router;
