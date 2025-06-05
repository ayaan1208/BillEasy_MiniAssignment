# BillEasy_MiniAssignment
Book Review API
A RESTful API for managing users, books, and reviews with JWT-based authentication.
---
Table of Contents
- Project Setup
- Run Locally
- API Endpoints
- Example API Requests
- Design Decisions & Assumptions
- Database Schema
---
Project Setup
1. Clone the repository:
 git clone <your-repo-url>
 cd book-review-api
2. Install dependencies:
 npm install
3. Create a .env file in the root directory and add the following environment variables:
 MONGO_URI=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret_key
 PORT=5050
4. Ensure MongoDB is running and accessible.
---
Run Locally
Start the server in development mode with auto-reload using:
npm run dev
Make sure your package.json has a script like:
"scripts": {
 "dev": "nodemon"
}
The server will run on http://localhost:5050.
---
API Endpoints
Method Endpoint Description
Auth Required
POST /api/auth/signup Register a new user No
POST /api/auth/login Authenticate user and receive JWT token No
POST /api/books Add a new book Yes
GET /api/books Get all books with pagination & optional filters No
GET /api/books/:id Get details of a book, average rating & reviews No
POST /api/books/:id/reviews Submit a review for a book Yes
PUT /api/reviews/:id Update your own review Yes
DELETE /api/reviews/:id Delete your own review Yes
GET /api/search Search books by title or author No
---
Example API Requests
1. Signup
curl -X POST http://localhost:5050/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"name": "Ayan", "email": "ayan@example.com", "password": "password123"}'
2. Login
curl -X POST http://localhost:5050/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "ayan@example.com", "password": "password123"}'
Response example:
{
 "token": "your_jwt_token_here"
}
3. Add a book (authenticated)
curl -X POST http://localhost:5050/api/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer your_jwt_token_here" \
-d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction",
"publishedYear": 1925}'
4. Get books with pagination & filter
curl "http://localhost:5050/api/books?page=1&limit=5&author=Fitzgerald"
---
Design Decisions & Assumptions
- JWT Authentication is used for protecting routes like adding books and submitting
reviews.
- Passwords are hashed using bcrypt before saving to the database for security.
- Pagination parameters (page and limit) are optional, defaulting to sensible values.
- Only one review per user per book is allowed.
- Review update/delete routes validate the user owns the review before permitting changes.
- Search endpoint supports case-insensitive and partial matches for titles and authors.
- No user roles implemented (e.g., admin vs user), but can be extended easily.
- Error handling is basic with relevant HTTP status codes and messages.
---
Database Schema
Users
Field Type Description
_id ObjectId Unique identifier
name String User's full name
email String User's email (unique)
password String Hashed password
Books
Field Type Description
_id ObjectId Unique identifier
title String Title of the book
author String Author's name
genre String Genre of the book
publishedYear Number Year the book was published
Reviews
Field Type Description
_id ObjectId Unique identifier
book ObjectId Reference to the Book
user ObjectId Reference to the User who wrote it
rating Number Numeric rating (e.g., 1-5)
comment String Review text
createdAt Date Review submission date
---
