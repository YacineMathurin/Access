const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const articleSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  displayName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  caption: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  people: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  hotels: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  salaries: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  area: {
    type: String,
    required: true,
    maxlength: 128,
  },
  active: {
    type: Boolean
  },
});

const Articles = mongoose.model("articles", articleSchema);

function validateArticle(article) {
  const schema = {
    userID: Joi.string().required().min(2).max(50),
    displayName: Joi.string().required().min(2).max(50),
    city: Joi.string().required().min(2).max(50),
    address: Joi.string().required().min(2).max(50),
    caption: Joi.string().required().min(2).max(1024),
    people: Joi.string().required().min(2).max(1024),
    hotels: Joi.string().required().min(1).max(1024),
    salaries: Joi.string().required().min(1).max(1024),
    area: Joi.string().required().min(1).max(1024),
    active: Joi.boolean(),
  };
  return Joi.validate(article, schema);
}

exports.Articles = Articles;
exports.validateArticle = validateArticle;
