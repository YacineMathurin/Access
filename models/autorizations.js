const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const collection = "Autorizations";
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  name: {
    type: String,
    maxlength: 255,
  },
  warehouse: Array,
  robot: Array
});
const Autorization = mongoose.model(collection, schema);

function validateReset(email) {
  const schema = {
    email: Joi.string().required().min(5).max(255).email(),
  };
  return Joi.validate(email, schema);
}
function validateResetConfirm(body) {
  const schema = {
    email: Joi.string().required().min(5).max(255).email(),
    code: Joi.string().required().min(4).max(4),
    password: Joi.string().required().min(5).max(1024),
  };
  return Joi.validate(body, schema);
}

exports.Autorization = Autorization;
exports.validateReset = validateReset;
exports.validateResetConfirm = validateResetConfirm;
