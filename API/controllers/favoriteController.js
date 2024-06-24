const Favorite = require('../models/Favorite');

exports.getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.getAll();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getFavoritesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const favorites = await Favorite.getByUserId(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createFavorite = async (req, res) => {
  try {
    const newFavorite = await Favorite.create(req.body);
    res.status(201).json({ message: "Favorite added successfully", favoriteId: newFavorite.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteFavorite = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const result = await Favorite.delete(userId, postId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
