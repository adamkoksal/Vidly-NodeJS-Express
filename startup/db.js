const mongoose = require("mongoose");
const winston = require("winston");

const URL =
  "mongodb+srv://akoksal:akoksal@mycluster-jptjg.mongodb.net/vidly_project?retryWrites=true&w=majority";

module.exports = async function () {
  await mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => winston.info("Connected to DB..."));
};
