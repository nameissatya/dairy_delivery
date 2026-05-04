const express = require("express");
const router = express.Router();

const {
  createSubscription,
  getMySubscriptions,
  toggleStatus,
} = require("../controllers/subscriptionController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createSubscription);
router.get("/", authMiddleware, getMySubscriptions);
router.put("/:id/toggle", authMiddleware, toggleStatus);

module.exports = router;
