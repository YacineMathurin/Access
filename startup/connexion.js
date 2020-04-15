const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey not set !");
    winston.error("FATAL ERROR: jwtPrivateKey not set !");
    process.exit(1);
  }
  // Returns a promise
  mongoose.connect("mongodb://localhost/playground").then(() => {
    console.log("Connected ...");
    winston.info("Connected to database ...");
  });
};
