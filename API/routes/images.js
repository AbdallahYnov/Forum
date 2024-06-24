const express = require('express');
const imageController = require('../controllers/imageController');
const router = express.Router();

router.get('/', imageController.getAllImages);
router.get('/:id', imageController.getImageById);
router.post('/', imageController.createImage);
router.put('/:id', imageController.updateImage);
router.delete('/:id', imageController.deleteImage);

module.exports = router;
