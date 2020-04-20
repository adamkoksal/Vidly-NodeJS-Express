const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

function validate(body) {
  const schema = {
    name: Joi.string().min(5).required(),
  };
  return Joi.validate(body, schema);
}

exports.Genre = mongoose.model("genre", genreSchema);
exports.validate = validate;