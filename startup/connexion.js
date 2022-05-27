const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");
require('dotenv').config();

module.exports = function () {
  const MONGODB_PASS = config.get("MONGODB_PASS"); 
  if (!MONGODB_PASS) {
    console.log("FATAL ERROR: missing .env file at the root of this project !");
    winston.error("FATAL ERROR: missing .env file at the root of this project !");
    process.exit(1);
  } 
  const connectionString = `mongodb+srv://admin:${MONGODB_PASS}@cluster0.pjomp.mongodb.net/market?retryWrites=true&w=majority`
  mongoose
    .connect(
      connectionString,
      { useNewUrlParser: true },  
    )
    .then(() => {
      console.log("Connected ...");
      winston.info("Connected to database ...");  
    })
    .catch(err => {throw new Error(err)} ); 
};  
