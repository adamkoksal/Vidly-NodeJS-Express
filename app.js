const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const ConnectDB = require("./Database/connection");

app.use(express.json());

ConnectDB();
app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on ${port}...`));
