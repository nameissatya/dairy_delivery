const Subscription = require("../models/Subscription");

exports.createSubscription = async (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const { quantity, frequency } = body;

    if (!quantity || !frequency) {
      return res.status(400).json({
        message: "quantity and frequency are required",
        hint: "frequency must be daily or alternate",
      });
    }

    const subscription = await Subscription.create({
      userId: req.user.id,
      quantity,
      frequency,
    });

    res.status(201).json({
      message: "Subscription created",
      subscription,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMySubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const sub = await Subscription.findById(req.params.id);

    if (!sub) {
      return res.status(404).json({ message: "Not found" });
    }

    if (String(sub.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    sub.status = sub.status === "active" ? "paused" : "active";
    await sub.save();

    res.json({
      message: "Status updated",
      status: sub.status,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
