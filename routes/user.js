const express = require("express");
const { User } = require("../models/user");
const { Autorization, } = require("../models/autorizations");
const router = express.Router();


router.get("/all", async (req, res) => {
  let users = await Autorization.find().sort({ "name": 1});
  res.status(200).send({users});
});
router.post("/delete", async (req, res) => {
  const {email} = req.body;
  console.log("delete", req.body);
  if (!email) return res.status(400).send({msg:"No email set"});
  await User.deleteOne({ email });
  await Autorization.deleteOne({ email });
  res.status(200).send({msg:"User deleted"});
});
router.post("/autorize", async (req, res) => {
  // Should validate later
  const {email, warehouse, robot} = req.body;
  console.log("req.body", req.body);
  let user = await Autorization.findOne({ email });
  user.warehouse = warehouse;
  user.robot = robot;
  await user.save();

  res.status(200).send({user});
});

module.exports = router;
