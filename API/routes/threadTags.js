const express = require('express');
const threadTagController = require('../controllers/threadTagController');
const router = express.Router();

router.get('/', threadTagController.getAllThreadTags);
router.get('/thread/:threadId', threadTagController.getThreadTagsByThreadId);
router.post('/', threadTagController.createThreadTag);
router.delete('/thread/:threadId/tag/:tagId', threadTagController.deleteThreadTag);

module.exports = router;
