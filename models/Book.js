// models/Book.js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  author: { type: String, required: true, index: true },
  genre: String,
  publishedYear: Number,
});

module.exports = mongoose.model("Book", BookSchema);
