const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === +req.params.id);
  if (!genre)
    return res.send(404).send(`Genre ${req.params.id} does not exist`);
  res.send(genre);
});

router.post("/", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === +req.params.id);
  if (!genre)
    return res.send(404).send(`Genre ${req.params.id} does not exist`);

  const schema = {
    name: Joi.string().min(3).required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  genre.name = req.body.name;
  res.send(genre);
});

module.exports = router;
