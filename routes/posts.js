const router = require("express").Router();
const Post = require("../models/post.model");

// Create
router.route("/add").post(async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newPost = new Post({ title, content });

  try {
    await newPost.save();
    res.json({ msg: "New post added!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

// Get All
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

// Get by Id
router.route("/:id").get(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(400).json({ error: "Doesn't exist." });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server-side error." });
  }
});

// Update
router.route("/update/:id").post(async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(400).json({ error: "Doesn't exist." });
    } else {
      post.title = req.body.title;
      post.content = req.body.content;

      await post.save();
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
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
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
