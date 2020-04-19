const express = require("express");
const app = express();
const genres = require("./routes/genres");
const ConnectDB = require("./Database/connection");

ConnectDB();
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on ${port}...`));
