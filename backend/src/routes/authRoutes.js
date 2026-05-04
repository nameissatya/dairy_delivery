const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
    "/register",
    [
      body("name").notEmpty(),
      body("phone").isLength({ min: 10 }),
      body("password").isLength({ min: 6 }),
    ],
    register
  );
router.post(
    "/login",
    [
      body("phone").isLength({ min: 10 }),
      body("password").isLength({ min: 6 }),
    ],
    login
  );

module.exports = router;
