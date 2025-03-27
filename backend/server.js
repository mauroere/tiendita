const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const sqlite3 = require("sqlite3").verbose(); // Import SQLite

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database("./tiendita.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT NOT NULL,
        address TEXT NOT NULL,
        items TEXT NOT NULL,
        status TEXT NOT NULL
      )`
    );
  }
});

// Routes
app.use("/api/products", productRoutes(db)); // Pass db instance
app.use("/api/orders", orderRoutes(db)); // Pass db instance

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
