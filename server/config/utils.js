
exports.checkUser = function(req, res, next) {
  if  (req.isAuthenticated()) { console.log('working'); return next(); }
  res.redirect('/login');
};
