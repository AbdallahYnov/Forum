const express = require('express');
const subcategoryController = require('../controllers/subcategoryController');
const router = express.Router();

router.get('/', subcategoryController.getAllSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);
router.post('/', subcategoryController.createSubcategory);
router.put('/:id', subcategoryController.updateSubcategory);
router.delete('/:id', subcategoryController.deleteSubcategory);

module.exports = router;
