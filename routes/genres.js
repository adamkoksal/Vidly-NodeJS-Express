const express = require("express");
const router = express.Router();
const {Genre, validate} = require("../Database/genre");

router.use(express.json());

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  await Genre.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(404).send(err.message));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  await new Genre(req.body)
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err.message));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => res.send(data))
    .catch((err) => res.send(err.message));
});

router.delete("/:id", async (req, res) => {
  await Genre.findByIdAndDelete(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(404).send(err.message));
});

module.exports = router;
