// controllers/reviewController.js
const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const userId = req.userId;
    const bookId = req.params.id;
    const { rating, comment } = req.body;

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview)
      return res.status(400).json({ message: "You have already reviewed this book" });

    const review = new Review({ book: bookId, user: userId, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    review.updatedAt = new Date();

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
