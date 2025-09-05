const express = require("express");
const User = require("../models/User");

const router = express.Router();

const ENCRYPTION_KEY = "your-secret-key"; // Replace with your actual key

router.get("/", (req, res) => {
  res.send("Hello world");
});

// Login
router.post("/login", async (req, res) => {
  const { username, number } = req.body; // Extract both username and phone

  try {
    // Decrypt the phone number
    // const bytes = CryptoJS.AES.decrypt(number, ENCRYPTION_KEY);
    // const decryptedNumber = bytes.toString(CryptoJS.enc.Utf8);

    const user = await User.findOne({ username });
    if (user && user.phone === "") {
      user.phone = number;
      user.logindatetime = new Date().toISOString();
      await user.save();
    } else if (user.phone !== decryptedNumber) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Successful login
    req.session.user = {
      id: user._id,
      username: user.username,
      phone: user.phone,
    };
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Render main page
router.get("/main", async (req, res) => {
  res.render("main", { user: req.session.user });
});

// Route to update the user's score
router.post("/update-score", async (req, res) => {
  try {
    const { score } = req.body;

    // Find the currently logged-in user
    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's score
    if (user.score < score) user.score = score;
    await user.save();

    res.json({ success: true, message: "Score updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/main");
  });
});

router.get("/api/users", async (req, res) => {
  try {
    // Fetch users with score > 0 and sort by score in descending order
    const filteredUsers = await User.find({ score: { $gt: 0 } })
      .sort({ score: -1 })
      .exec();

    res.json({
      message: "Balance updated successfully",
      users: filteredUsers,
      success: true,
    });
    console.log("Sent users successfuly"); // Send back the filtered users
  } catch (err) {
    console.error("Error fetching users from database:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
