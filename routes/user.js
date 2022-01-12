const { ResetCode, validateReset, validateResetConfirm } = require("../models/reset");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const emailing = require("../tools/emailing");
const pruner = require("../tools/pruner");
const _ = require("lodash");
var randomstring = require("randomstring");
const bcrypt = require("bcrypt");

router.get("/all", async (req, res) => {
  let users = await User.find().sort({ "name": 1});
  res.status(200).send({users});
});


module.exports = router;
