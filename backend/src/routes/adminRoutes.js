const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const User = require("../models/User");
const Subscription = require("../models/Subscription");
const Delivery = require("../models/Delivery");

router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get(
  "/subscriptions",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const subs = await Subscription.find()
        .populate("userId", "name phone")
        .sort({ createdAt: -1 });
      res.json(subs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get("/deliveries", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("userId", "name phone")
      .populate("subscriptionId")
      .sort({ createdAt: -1 });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const subs = await Subscription.countDocuments();
    const deliveries = await Delivery.countDocuments();

    res.json({
      users,
      subscriptions: subs,
      deliveries,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
