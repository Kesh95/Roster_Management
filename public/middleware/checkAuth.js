// middleware/checkAuth.js
module.exports = function (req, res, next) {
    if (req.session && req.session.user) {
      next(); // User is logged in
    } else {
      res.redirect("/login.html"); // Redirect to login if not authenticated
    }
  };
  