const express = require("express");
const { Articles, validateArticle } = require("../models/articles");
const router = express.Router();
const _ = require("lodash");
var ObjectID = require('mongodb').ObjectID;   


router.get("/", async (req, res) => {
  const response = await Articles.find();
  res.status(200).send({ data: response });
});
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  const response = await Articles.find({ _id });
  res.status(200).send({ data: response });
});
router.post("/", async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = new Articles(_.pick(req.body, 
    ["city", "address", "caption", "people", "hotels", "salaries", "area", "active"]
  ));

  await article.save();
  res.status(200).send({ msg:"Item Saved" });
});
router.put("/", async (req, res) => {
  const { city, address, caption, people, hotels, salaries, area, active, _id} = req.body;
  let article = await Articles.findOne({ _id });
  console.log(req.body._id, article);

  // For now
  article.active = active;
  await article.save();
  res.status(200).send({ data: article, msg:"Item Updated" });
});
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  const response = await Articles.deleteOne({ _id });
  res.status(200).send({ data: response });
});

module.exports = router;
