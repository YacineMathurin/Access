const { ResetCode, validateReset } = require("../models/reset");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const emailing = require("../tools/emailing");
const pruner = require("../tools/pruner");
const _ = require("lodash");
var randomstring = require("randomstring");


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
  res.status(200).send({message:"Reset email code sent"});
});

module.exports = router;
