// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware.js");
const bookController = require("../controllers/bookController");
const reviewController = require("../controllers/reviewController");
const searchController = require("../controllers/searchController");

// Book routes
router.post("/books", auth, bookController.addBook);
router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);

// Review routes
router.post("/books/:id/reviews", auth, reviewController.addReview);
router.put("/reviews/:id", auth, reviewController.updateReview);
router.delete("/reviews/:id", auth, reviewController.deleteReview);

// Search
router.get("/search", searchController.searchBooks);

module.exports = router;
