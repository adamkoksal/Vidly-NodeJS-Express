const express = require("express");
const router = express.Router();
const Rental = require("../Database/rental");
const { Customer } = require("../Database/customer");
const Movie = require("../Database/movie");
const Joi = require("joi");

router.get("/", async (req, res) => {
  await Rental.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.get("/:id", async (req, res) => {
  await Rental.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId).catch((err) =>
    console.log(err.message)
  );
  if (!customer) return res.status(400).send("Customer does not exist");
  const movie = await Movie.findById(req.body.movieId).catch((err) =>
    console.log(err.message)
  );
  if (!movie) return res.status(400).send("Movie does not exist");
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  await rental
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
  movie.numberInStock--;
  movie.save();
});

function validate(body) {
  schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };
  return Joi.validate(body, schema);
}

module.exports = router;
