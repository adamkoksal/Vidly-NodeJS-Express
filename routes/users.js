const express = require("express");
const router = express.Router();
const { User, validate } = require("../Database/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  let user = await User.findOne({ email: req.body.email.toLowerCase() });

  if (user) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);

  user = new User({
    name: req.body.name.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: await bcrypt.hash(req.body.password, salt),
  });
  await user
    .save()
    .then((data) => {
      const token = user.createToken();
      res
        .header("x-auth-token", token)
        .send(_.pick(data, ["_id", "name", "email"]));
    })
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
