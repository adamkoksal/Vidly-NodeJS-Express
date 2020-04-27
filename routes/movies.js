const Movie = require("../Database/movie");
const { Genre } = require("../Database/genre");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  await Movie.find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.get("/:id", async (req, res) => {
  await Movie.findById(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genreObj = await Genre.findById(req.body.genreId);
  if (!genreObj) return res.status(400).send("Invalid Genre.");

  const movie = {
    title: req.body.title,
    genre: {
      _id: genreObj._id,
      name: genreObj.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  };
  await new Movie(movie)
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genreObj = await Genre.findById(req.body.genreId);
  if (!genreObj) return res.status(400).send("Invalid genre.");

  await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genreObj._id,
        name: genreObj.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.delete("/:id", auth, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err.message));
});

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };

  return Joi.validate(movie, schema);
}

module.exports = router;
