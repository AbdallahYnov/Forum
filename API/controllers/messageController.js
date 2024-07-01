const Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.getAll();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.getMessageById = async (req, res) => {
  const messageId = req.params.id;
  try {
    const message = await Message.getById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json({ message: "Message created successfully", messageId: newMessage.insertId });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.updateMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const result = await Message.update(messageId, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

exports.deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const result = await Message.delete(messageId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


const messages = []; // In-memory message store for simplicity. Use a database in a real application.

exports.getMessages = (req, res) => {
    const game = req.query.game;
    const gameMessages = messages.filter(msg => msg.game === game);
    res.json(gameMessages);
};

exports.postMessage = (req, res) => {
    const { game, text } = req.body;
    const username = req.session.username || 'Anonyme'; // Use session or default to 'Anonyme'
    const message = { game, text, username };
    messages.push(message);
    res.json({ success: true });
};
