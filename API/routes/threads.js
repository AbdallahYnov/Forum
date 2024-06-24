const express = require('express');
const threadController = require('../controllers/threadController');
const router = express.Router();

router.get('/', threadController.getAllThreads);
router.get('/:id', threadController.getThreadById);
router.post('/', threadController.createThread);
router.put('/:id', threadController.updateThread);
router.delete('/:id', threadController.deleteThread);

module.exports = router;
