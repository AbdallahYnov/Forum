const express = require('express');
const reactionController = require('../controllers/reactionController');
const router = express.Router();

router.get('/', reactionController.getAllReactions);
router.get('/:id', reactionController.getReactionById);
router.post('/', reactionController.createReaction);
router.put('/:id', reactionController.updateReaction);
router.delete('/:id', reactionController.deleteReaction);

module.exports = router;
