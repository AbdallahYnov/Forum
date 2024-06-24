const express = require('express');
const friendController = require('../controllers/friendController');
const router = express.Router();

router.get('/', friendController.getAllFriends);
router.get('/user/:userId', friendController.getFriendsByUserId);
router.post('/', friendController.createFriend);
router.delete('/user1/:userId1/user2/:userId2', friendController.deleteFriend);

module.exports = router;
