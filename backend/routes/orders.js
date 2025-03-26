const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { customerName, address, items } = req.body;

  if (!customerName || !address || !items || !items.length) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const order = { customerName, address, items, status: "pending" };
  res.status(201).json({ message: "Order created", order });
});

module.exports = router;
