const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "username" }, async (username, done) => {
      try {
        // Match user
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, {
            message: "That email is not registered",
          });
        }

        // Match password
        const isMatch = await bcrypt.compare(username, user.username);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Username incorrect" });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
