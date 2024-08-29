const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get(
  "/getuserinfo",
  authController.authentication,
  authController.getUserInfo
);

module.exports = router;
