const User = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expiration time
  });
};

// Route for User Registration
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (validator.isEmail(email) === false) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    // Hash the password before saving (in production, use a stronger hashing algorithm)
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();

    // Create a JWT token for the user
    const token = createToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token, // Send the token back to the client
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route for User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token for the user
    const token = createToken(user._id);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role, // Include user role if needed
      },
      token, // Send the token back to the client
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logic for admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  try {
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(
        {
          id: "admin-unique-id",
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Admin logged in successfully",
        user: {
          id: "admin-unique-id",
          email,
          role: "admin",
        },
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error in admin login:", error);
    return res.status(500).json({ message: "Admin login failed" });
  }
};

const logoutUser = (req, res) => {
  // Invalidate the token on the client side by removing it
  
  res.status(200).json({ message: "User logged out successfully" });
};


module.exports = {
  loginUser,
  registerUser,
  adminLogin,
};
