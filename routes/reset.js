const { ResetCode, validateReset, validateResetConfirm } = require("../models/reset");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const emailing = require("../tools/emailing");
const pruner = require("../tools/pruner");
const _ = require("lodash");
var randomstring = require("randomstring");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  // Validate request
  const { email } = req.body;
  const { error } = validateReset(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if already existing
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send({message:"User account not found, create one please !"});

  const code = randomstring.generate({
    length: 4,
    charset: 'numeric'
  });
  var resetCode = new ResetCode(_.pick(req.body, [ "email"]));
  resetCode.code = code;
  await resetCode.save();
  emailing(email, code);
  pruner(email);
  res.status(200).send({message:"Code de reinitialisation envoyé"});
});

router.post("/confirm", async (req, res) => {
  // Validate request
  console.log("req.body", req.body);
  const { code, email, password } = req.body;
  const { error } = validateResetConfirm(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if already existing
  let user = await ResetCode.findOne({ email });
  if (!user) return res.status(400).send({message:"Code introuvable, veuillez regenerer à nouveau"});
  if (user.code !== code) return res.status(400).send({message:"Erreur sur le code, veuillez reessayer"});

  user = await User.findOne({ email: email });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({token});
});

module.exports = router;
