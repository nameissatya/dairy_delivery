const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyDeliveries,
  skipDelivery,
  unskipDelivery,
} = require("../controllers/deliveryController");

router.get("/my", authMiddleware, getMyDeliveries);
router.put("/:id/skip", authMiddleware, skipDelivery);
router.put("/:id/unskip", authMiddleware, unskipDelivery);

module.exports = router;
