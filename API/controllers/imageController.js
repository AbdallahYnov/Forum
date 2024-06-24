const Image = require('../models/Image');

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.getAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getImageById = async (req, res) => {
  const imageId = req.params.id;
  try {
    const image = await Image.getById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createImage = async (req, res) => {
  try {
    const newImage = await Image.create(req.body);
    res.status(201).json({ message: "Image created successfully", imageId: newImage.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateImage = async (req, res) => {
  const imageId = req.params.id;
  try {
    const result = await Image.update(imageId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteImage = async (req, res) => {
  const imageId = req.params.id;
  try {
    const result = await Image.delete(imageId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
