const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, maxlength: 50 },
});

function validate(body) {
  const schema = {
    name: Joi.string().required().min(5).max(50),
    isGold: Joi.boolean(),
    phone: Joi.string().required(),
  };
  return Joi.validate(body, schema); 
}

exports.Customer = mongoose.model("customer", customerSchema);
exports.validate = validate;
exports.customerSchema = customerSchema;