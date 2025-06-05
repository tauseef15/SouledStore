const express = require("express");
const { sendOrderMail } = require("../controllers/orderController");
const router = express.Router();
const Order = require("../models/orderModel");
const authenticate = require("../middlewares/authentication");

router.get("/my-orders", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Failed to get orders:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/place-order", authenticate , sendOrderMail);

module.exports = router;
