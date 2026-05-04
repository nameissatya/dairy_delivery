const User = require("../models/User");

async function adminMiddleware(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("role");
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = adminMiddleware;
