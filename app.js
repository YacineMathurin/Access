const express = require("express");
const cors = require('cors');
const app = express();
const winston = require("winston");
app.use(cors());

require("./startup/logging")();
require("./startup/startup_routes")(app);
require("./startup/connexion")();
require("./startup/prod")(app);


// Simulate out of express error
// throw new Error("GOT AN STARTUP ERROR");

// const p = Promise.reject(new Error("Miserably failed !"));
// p.then(() => console.log("Done"));

const port = process.env.PORT | 5000;
app.listen(port, () => winston.info(`Listening on port ${port}`));
