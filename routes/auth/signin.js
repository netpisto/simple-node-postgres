const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("../../db/pool");

const router = express.Router();

// Middleware to parse JSON in request body
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [userName]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Authentication failed. User not found." });
    }
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: "Authentication successful", user });
    } else {
      res.status(401).json({ error: "Authentication failed. Incorrect password." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred during authentication." });
  }
});

module.exports = router;
