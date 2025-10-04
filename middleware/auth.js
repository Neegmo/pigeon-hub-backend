const passport = require("passport");

// Middleware to protect routes with JWT authentication
const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Authentication error" });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid or missing token" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authenticateJWT };
