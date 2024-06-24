const Friend = require('../models/Friend');

exports.getAllFriends = async (req, res) => {
  try {
    const friends = await Friend.getAll();
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getFriendsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const friends = await Friend.getByUserId(userId);
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createFriend = async (req, res) => {
  try {
    const newFriend = await Friend.create(req.body);
    res.status(201).json({ message: "Friend added successfully", friendId: newFriend.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteFriend = async (req, res) => {
  const { userId1, userId2 } = req.params;
  try {
    const result = await Friend.delete(userId1, userId2);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
