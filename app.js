require("express-async-errors");
const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();

winston.exceptions.handle(
  new winston.transports.File({ filename: "logfile.log" })
);

process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on ${port}...`));
