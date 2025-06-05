// controllers/bookController.js
const Book = require("../models/Book");
const Review = require("../models/Review");

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const book = new Book({ title, author, genre, publishedYear });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find book
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Pagination params for reviews
    const { page = 1, limit = 5 } = req.query;

    // Find reviews & average rating
    const reviews = await Review.find({ book: bookId })
      .populate("user", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const ratings = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: "$book", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    ]);

    res.json({
      book,
      averageRating: ratings.length ? ratings[0].avgRating : null,
      reviews,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
