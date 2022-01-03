const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

const post = mongoose.model("post", postSchema, "posts");

module.exports = post;
