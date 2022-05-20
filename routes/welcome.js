const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  res.status(200).send({message: "Welcome to you !"});
});

module.exports = router;
