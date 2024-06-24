const Subcategory = require('../models/Subcategory');

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.getAll();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getSubcategoryById = async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const subcategory = await Subcategory.getById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createSubcategory = async (req, res) => {
  try {
    const newSubcategory = await Subcategory.create(req.body);
    res.status(201).json({ message: "Subcategory created successfully", subcategoryId: newSubcategory.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateSubcategory = async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const result = await Subcategory.update(subcategoryId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json({ message: "Subcategory updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteSubcategory = async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const result = await Subcategory.delete(subcategoryId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
