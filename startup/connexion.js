const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey") || !config.get("emailPass") || !config.get("noreplyEmailAdd")) {
    console.log("FATAL ERROR: jwtPrivateKey and/or emailPass not set !");
    winston.error("FATAL ERROR: jwtPrivateKey and/or emailPass not set !");
    process.exit(1);
  }
  mongoose
    .connect(
      "mongodb://127.0.0.1/softrobot"
    )
    .then(() => {
      console.log("Connected ...");
      winston.info("Connected to database ...");
    });
};
