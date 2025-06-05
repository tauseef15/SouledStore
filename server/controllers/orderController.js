const Order = require("../models/orderModel");

const sendOrderMail = async (req, res) => {
  const { cart, address } = req.body;

  try {
    const newOrder = new Order({
      userId: req.userId, // comes from auth middleware
      items: cart,
      address: address,
      email: address.email,
    });

    await newOrder.save();

    // Optional: send email here if needed

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("❌ Failed to place order:", error);
    res.status(500).json({ error: "Order placement failed" });
  }
};

module.exports = { sendOrderMail };
