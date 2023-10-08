const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/pool");
const my = require("./user/my")
const router = express.Router();

router.use(bodyParser.json());
router.use("/my",my)
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const result = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    const user = result.rows[0];
    res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while retrieving user information." });
  }
});

module.exports = router;
