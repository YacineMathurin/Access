const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
require('dotenv').config();

module.exports = function () {
  if (!process.env.MONGODB_ADDR) {
    console.log("FATAL ERROR: missing .env file at the root of this project !");
    winston.error("FATAL ERROR: missing .env file at the root of this project !");
    process.exit(1);
  }
  mongoose
    .connect(
      `mongodb://${process.env.USERNAME_CONNEXION_DB}:${process.env.PASS_CONNEXION_DB}@${process.env.MONGODB_ADDR}:27017/softrobot?authSource=admin`,
      { useNewUrlParser: true },  
    )
    .then(() => {
      console.log("Connected ...");
      winston.info("Connected to database ..."); 
    })
    .catch(err => {throw new Error(err)} ); 
}; 
