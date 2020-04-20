const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../Database/customer");

router.get("/", async (req, res) => {
  await Customer.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.get("/:id", async (req, res) => {
  await Customer.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(`Error: ${error.details[0].message}`);

  await new Customer(req.body)
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/:id", async (req, res) => {
  await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
