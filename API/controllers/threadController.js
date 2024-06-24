const Thread = require('../models/Thread');

exports.getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.getAll();
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getThreadById = async (req, res) => {
  const threadId = req.params.id;
  try {
    const thread = await Thread.getById(threadId);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json(thread);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createThread = async (req, res) => {
  try {
    const newThread = await Thread.create(req.body);
    res.status(201).json({ message: "Thread created successfully", threadId: newThread.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateThread = async (req, res) => {
  const threadId = req.params.id;
  try {
    const result = await Thread.update(threadId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json({ message: "Thread updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteThread = async (req, res) => {
  const threadId = req.params.id;
  try {
    const result = await Thread.delete(threadId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
