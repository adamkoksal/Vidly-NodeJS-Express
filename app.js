const express = require("express");
const app = express();
const dontenv = require("dotenv").config();


require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on ${port}...`));