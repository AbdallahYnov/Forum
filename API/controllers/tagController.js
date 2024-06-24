const Tag = require('../models/Tag');

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.getAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getTagById = async (req, res) => {
  const tagId = req.params.id;
  try {
    const tag = await Tag.getById(tagId);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json({ message: "Tag created successfully", tagId: newTag.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateTag = async (req, res) => {
  const tagId = req.params.id;
  try {
    const result = await Tag.update(tagId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json({ message: "Tag updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteTag = async (req, res) => {
  const tagId = req.params.id;
  try {
    const result = await Tag.delete(tagId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
