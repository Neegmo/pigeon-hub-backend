const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
    body("name").notEmpty().withMessage("Name required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password, name } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed, name });
      res.json({ id: user.id, email: user.email, name: user.name });
    } catch (err) {
      res.status(500).json({ error: "User registration failed" });
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      // Check if password is hashed (starts with $2b$) or plain text
      let match;
      if (user.password.startsWith("$2b$")) {
        // Password is hashed, use bcrypt
        match = await bcrypt.compare(password, user.password);
      } else {
        // Password is plain text (for existing users)
        match = password === user.password;
      }

      if (!match) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "supersecret",
        { expiresIn: "1d" }
      );
      res.json({
        token,
        user: { id: user._id, email: user.email, name: user.name },
      });
    } catch (err) {
      res.status(500).json({ error: "Login failed" });
    }
  }
);

module.exports = router;
