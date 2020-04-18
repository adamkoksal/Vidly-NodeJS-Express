const express = require("express");
const app = express();

const genres = require('./routes/genres');


app.use('/api/genres', genres);


app.listen(3000, () => console.log("Running on 3000"));
