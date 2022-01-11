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
    maxlength: 1024,
  },
});
const ResetCode = mongoose.model(collection, resetSchema);

function validateReset(email) {
  const schema = {
    email: Joi.string().required().min(5).max(255).email(),
  };
  return Joi.validate(email, schema);
}

exports.ResetCode = ResetCode;
exports.validateReset = validateReset;
