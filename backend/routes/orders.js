const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", (req, res) => {
    const { customerName, address, items } = req.body;

    if (!customerName || !address || !items || !items.length) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const itemsString = JSON.stringify(items);
    db.run(
      `INSERT INTO orders (customerName, address, items, status) VALUES (?, ?, ?, ?)`,
      [customerName, address, itemsString, "pending"],
      function (err) {
        if (err) {
          return res.status(500).json({ message: "Error creating order" });
        }
        res.status(201).json({ message: "Order created", orderId: this.lastID });
      }
    );
  });

  return router;
};
