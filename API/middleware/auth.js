function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  }
  
  module.exports = isAuthenticated;
  

  function isAdminAuthenticated(req, res, next) {
    if (req.session.userId && req.session.isAdmin) {
        return next();
    }
    res.redirect('/login');
}

module.exports = isAdminAuthenticated;
