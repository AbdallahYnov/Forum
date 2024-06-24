const Reaction = require('../models/Reaction');

exports.getAllReactions = async (req, res) => {
  try {
    const reactions = await Reaction.getAll();
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getReactionById = async (req, res) => {
  const reactionId = req.params.id;
  try {
    const reaction = await Reaction.getById(reactionId);
    if (!reaction) {
      return res.status(404).json({ message: "Reaction not found" });
    }
    res.status(200).json(reaction);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createReaction = async (req, res) => {
  try {
    const newReaction = await Reaction.create(req.body);
    res.status(201).json({ message: "Reaction created successfully", reactionId: newReaction.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateReaction = async (req, res) => {
  const reactionId = req.params.id;
  try {
    const result = await Reaction.update(reactionId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reaction not found" });
    }
    res.status(200).json({ message: "Reaction updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteReaction = async (req, res) => {
  const reactionId = req.params.id;
  try {
    const result = await Reaction.delete(reactionId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reaction not found" });
    }
    res.status(200).json({ message: "Reaction deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
