const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const db = require("../../db/pool");

const router = express.Router();
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;

    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      "INSERT INTO users (username, password, first_name, last_name, date_of_creation) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING user_id",
      [userName, hashedPassword, firstName, lastName]
    );

    const newUser = result.rows[0];
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "make sure that all fields are valid (have a unique username)" });
  }
});

module.exports = router;
