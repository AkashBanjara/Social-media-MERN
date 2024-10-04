const {
  signupController,
  loginController,
  refreshAccessTokenController,
  logoutController,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/refresh", refreshAccessTokenController);
router.post("/logout", logoutController);

module.exports = router;
