const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");




// Load env vars
dotenv.config();

// Connect to DB
connectDB();
console.log("Loaded env variables:", process.env.MONGO_URI, process.env.JWT_SECRET);



const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
  });
  app.use("/api", bookRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
