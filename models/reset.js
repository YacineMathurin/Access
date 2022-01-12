const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const collection = "temp";
const resetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
});
const ResetCode = mongoose.model(collection, resetSchema);

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

exports.ResetCode = ResetCode;
exports.validateReset = validateReset;
exports.validateResetConfirm = validateResetConfirm;
