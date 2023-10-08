const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  // user gets his data
  res.send("your name is ");
});


module.exports = router;