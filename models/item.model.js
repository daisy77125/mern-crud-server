const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

const item = mongoose.model("item", itemSchema, "items");

module.exports = item;
