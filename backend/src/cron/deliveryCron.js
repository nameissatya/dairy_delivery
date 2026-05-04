const cron = require("node-cron");
const { generateTodayDeliveries } = require("../services/deliveryService");

function startDeliveryCron() {
  cron.schedule("59 23 * * *", async () => {
    console.log("Running delivery engine...");
    try {
      await generateTodayDeliveries();
    } catch (err) {
      console.error("Delivery cron error:", err.message);
    }
  });
}

module.exports = startDeliveryCron;
