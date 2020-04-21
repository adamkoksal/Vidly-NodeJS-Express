const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: { type: Number, required: true, min: 0, maxlength: 255 },
  dailyRentalRate: { type: Number, required: true, min: 0, maxlength: 255 },
});

module.exports = Movie = mongoose.model("movie", movieSchema);
