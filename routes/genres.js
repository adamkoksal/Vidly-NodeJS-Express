const Joi = require("joi");
const express = require("express");
const router = express.Router();
const Genre = require("../Database/genre");

router.use(express.json());

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  await Genre.findById(req.params.id, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.send(data);
  });
});

router.post("/", async (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const { name } = req.body;
  let genre = {};
  genre.name = name;
  let genreModel = new Genre(genre);
  await genreModel.save();

  res.send(genreModel);
});

router.put("/:id", async (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  const update = { name: req.body.name };
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true },
    function (err, model) {
      if (err) res.send(err.message);
      else res.send(model);
    }
  );
});

router.delete("/:id", async (req, res) => {
  await Genre.findByIdAndDelete(req.params.id, function (err, model) {
    if (err) res.send(err.message);
    else res.send(model);
  });
});

module.exports = router;
