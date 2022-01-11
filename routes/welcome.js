const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/", async (req, res) => {
  res.status(200).send({message: "Welcome !"});
});

module.exports = router;
