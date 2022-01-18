const { User, validateSignUp } = require("../models/user");
const { Autorization, } = require("../models/autorizations");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  // Validate request
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if already existing
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registred !");
  //   Good to register
  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  autorization = new Autorization(_.pick(req.body, ["name", "email"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.idClient = 0;

  autorization.warehouse = [];
  autorization.robot = [];
  
  await user.save();
  await autorization.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
