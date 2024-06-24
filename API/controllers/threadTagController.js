const ThreadTag = require('../models/ThreadTag');

exports.getAllThreadTags = async (req, res) => {
  try {
    const threadTags = await ThreadTag.getAll();
    res.status(200).json(threadTags);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getThreadTagsByThreadId = async (req, res) => {
  const threadId = req.params.threadId;
  try {
    const threadTags = await ThreadTag.getByThreadId(threadId);
    res.status(200).json(threadTags);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createThreadTag = async (req, res) => {
  try {
    const newThreadTag = await ThreadTag.create(req.body);
    res.status(201).json({ message: "ThreadTag created successfully", threadTagId: newThreadTag.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteThreadTag = async (req, res) => {
  const { threadId, tagId } = req.params;
  try {
    const result = await ThreadTag.delete(threadId, tagId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ThreadTag not found" });
    }
    res.status(200).json({ message: "ThreadTag removed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
