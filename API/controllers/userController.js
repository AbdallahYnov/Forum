const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.getById(userID);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register user
exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const userID = req.params.id;
  try {
    await User.update(userID, req.body);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const userID = req.params.id;
  try {
    await User.delete(userID);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    req.session.userId = user.UserID; // Store user ID in session
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
};
