const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    phoneNumber: { type: String },
    profilePicture: { type: String, default: "default.jpg" }, // URL to the profile picture
    cartData: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    role: { type: String, default: "user" }, // e.g., user, admin
    createdAt: { type: Date, default: Date.now },
  },
  { minimize: false } // Disable mongoose's default minimization behavior
);

const User = mongoose.model("User", userSchema);
module.exports = User;