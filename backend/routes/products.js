const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    db.all(
      `SELECT * FROM products WHERE name LIKE ? LIMIT ? OFFSET ?`,
      [`%${search}%`, limit, offset],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ message: "Error fetching products" });
        }
        res.json(rows);
      }
    );
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching product" });
      }
      if (!row) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(row);
    });
  });

  router.post("/", (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    db.run(
      `INSERT INTO products (name, price) VALUES (?, ?)`,
      [name, price],
      function (err) {
        if (err) {
          return res.status(500).json({ message: "Error adding product" });
        }
        res.status(201).json({ message: "Product added", productId: this.lastID });
      }
    );
  });

  return router;
};
