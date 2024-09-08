const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/authController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/getuserinfo", authController.getUserInfo);
router.get(
  "/getallusers",
  authController.authenticate,
  authController.getAllUsers
);
router.post("/refresh", authController.RefreshToken);
router.get("/logout", authController.logout);

module.exports = router;
