function isAdminAuthenticated(req, res, next) {
    if (req.session.userId && req.session.isAdmin) {
        return next();
    }
    res.redirect('/login');
}

module.exports = isAdminAuthenticated;
