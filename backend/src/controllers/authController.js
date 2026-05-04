const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

exports.register = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const { name, phone, password, address } = body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        message: "name, phone, and password are required",
        hint: "Use header Content-Type: application/json and a JSON object body",
      });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      address,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = asyncHandler(async (req, res) => {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const { phone, password } = body;

    if (!process.env.JWT_SECRET) {
      res.status(500);
      throw new Error("Server missing JWT_SECRET");
    }

    const user = await User.findOne({ phone });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
    res.json({
      message: "Login successful",
      token,
    });
  });
