const router = require("express").Router();
const Item = require("../models/item.model");

// Create
router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  const newItem = new Item({ name, description });

  try {
    await newItem.save();
    res.json({ msg: "New item added!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

// Get All
router.route("/").get(async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

// Get by Id
router.route("/:id").get(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(400).json({ error: "Doesn't exist." });
    } else {
      res.json(item);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

// Update
router.route("/update/:id").post(async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;

  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(400).json({ error: "Doesn't exist." });
    } else {
      item.name = req.body.name;
      item.description = req.body.description;

      await item.save();
      res.json({ msg: "Updated." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

// Delete
router.route("/:id").delete(async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(400).json({ error: "Doesn't exist." });
    } else {
      res.json({ msg: "Deleted." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

module.exports = router;
