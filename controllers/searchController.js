// controllers/searchController.js
const Book = require("../models/Book");

exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Query parameter 'q' is required" });

    // Case-insensitive partial match on title or author
    const books = await Book.find({
      $or: [
        { title: new RegExp(q, "i") },
        { author: new RegExp(q, "i") },
      ],
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
