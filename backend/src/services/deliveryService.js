const Subscription = require("../models/Subscription");
const Delivery = require("../models/Delivery");

/**
 * Start of local calendar day (server timezone).
 * Set process.env.TZ=Asia/Kolkata in production for IST-aligned behavior.
 */
function startOfDay(dateInput) {
  const d = new Date(dateInput);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Instant when skip/restore closes: 9 PM on the local day before delivery. */
function skipCutoffTime(deliveryDateInput) {
  const deliveryStart = startOfDay(deliveryDateInput);
  const cutoff = new Date(deliveryStart);
  cutoff.setDate(cutoff.getDate() - 1);
  cutoff.setHours(21, 0, 0, 0);
  return cutoff;
}

function isWithinSkipCutoff(deliveryDateInput, now = new Date()) {
  return now.getTime() < skipCutoffTime(deliveryDateInput).getTime();
}

exports.startOfDay = startOfDay;
exports.skipCutoffTime = skipCutoffTime;
exports.isWithinSkipCutoff = isWithinSkipCutoff;

function shouldDeliver(startDateInput, todayLocalStart, frequency) {
  const startDay = startOfDay(startDateInput);

  if (todayLocalStart < startDay) {
    return false;
  }

  if (frequency === "daily") {
    return true;
  }

  if (frequency === "alternate") {
    const diffDays = Math.round(
      (todayLocalStart - startDay) / 86400000
    );
    return diffDays % 2 === 0;
  }

  return false;
}

exports.generateTodayDeliveries = async () => {
  const todayDay = startOfDay(new Date());

  const subscriptions = await Subscription.find({ status: "active" });

  for (const sub of subscriptions) {
    const deliver = shouldDeliver(sub.startDate, todayDay, sub.frequency);

    if (deliver) {
      // $setOnInsert only: skipped/delivered rows for this day stay as-is.
      await Delivery.findOneAndUpdate(
        { subscriptionId: sub._id, date: todayDay },
        {
          $setOnInsert: {
            userId: sub.userId,
            subscriptionId: sub._id,
            date: todayDay,
            quantity: sub.quantity,
            status: "pending",
          },
        },
        { upsert: true }
      );
    }
  }

  console.log("Today deliveries generated");
};
