const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log('Tentative de récupération de tous les utilisateurs');
    const users = await User.getAll();
    console.log('Utilisateurs récupérés avec succès:', users);
    res.json(users);
  } catch (error) {
    console.log('Erreur lors de la récupération de tous les utilisateurs:', error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const userID = req.params.id;
  try {
    console.log(`Tentative de récupération de l'utilisateur avec ID ${userID}`);
    const user = await User.getById(userID);
    console.log(`Utilisateur récupéré avec succès pour l'ID ${userID}:`, user);
    res.json(user);
  } catch (error) {
    console.log(`Erreur lors de la récupération de l'utilisateur avec ID ${userID}:`, error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Register user
exports.createUser = async (req, res) => {
  try {
    console.log('Tentative de création d\'un nouvel utilisateur avec les données:', req.body);
    await User.create(req.body);
    console.log('Utilisateur créé avec succès');
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.log('Erreur lors de la création de l\'utilisateur:', error);
    res.status(400).json({ message: "Erreur interne du serveur" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const userID = req.params.id;
  try {
    console.log(`Tentative de mise à jour de l'utilisateur avec ID ${userID} et les données:`, req.body);
    await User.update(userID, req.body);
    console.log(`Utilisateur avec ID ${userID} mis à jour avec succès`);
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.log(`Erreur lors de la mise à jour de l'utilisateur avec ID ${userID}:`, error);
    res.status(400).json({ message: "Erreur interne du serveur" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const userID = req.params.id;
  try {
    console.log(`Tentative de suppression de l'utilisateur avec ID ${userID}`);
    await User.delete(userID);
    console.log(`Utilisateur avec ID ${userID} supprimé avec succès`);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.log(`Erreur lors de la suppression de l'utilisateur avec ID ${userID}:`, error);
    res.status(400).json({ message: "Erreur interne du serveur" });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(`Tentative de connexion pour le nom d'utilisateur ${username}`);
    const user = await User.adminLogin(username, password);
    console.log(`Utilisateur connecté avec succès:`, user);
    req.session.userId = user.UserID; // Store user ID in session
    req.session.isAdmin = user.isAdmin || false; // Store admin status in session
    res.json({ message: 'Connexion réussie', user });
  } catch (error) {
    console.log(`Erreur lors de la connexion pour le nom d'utilisateur ${username}:`, error);
    res.status(400).json({ message: error.message });
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Erreur lors de la déconnexion:', err);
      return res.status(500).json({ message: 'Échec de la déconnexion' });
    }
    res.clearCookie('connect.sid');
    console.log('Utilisateur déconnecté avec succès');
    res.redirect('/login'); // Redirect to login page after logout
  });
};
