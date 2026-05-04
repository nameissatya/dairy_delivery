const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "delivered", "skipped"],
      default: "pending",
    },
  },
  { timestamps: true }
);

deliverySchema.index({ subscriptionId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Delivery", deliverySchema);
