const Delivery = require("../models/Delivery");
const { isWithinSkipCutoff } = require("../services/deliveryService");

const SKIP_CUTOFF_MSG =
  "Skip or restore is only allowed before 9 PM on the day before the delivery date";

exports.getMyDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.skipDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    if (String(delivery.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!isWithinSkipCutoff(delivery.date)) {
      return res.status(400).json({ message: SKIP_CUTOFF_MSG });
    }
    if (delivery.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending deliveries can be skipped" });
    }

    delivery.status = "skipped";
    await delivery.save();
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.unskipDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    if (String(delivery.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!isWithinSkipCutoff(delivery.date)) {
      return res.status(400).json({ message: SKIP_CUTOFF_MSG });
    }
    if (delivery.status !== "skipped") {
      return res
        .status(400)
        .json({ message: "Only skipped deliveries can be restored" });
    }

    delivery.status = "pending";
    await delivery.save();
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
