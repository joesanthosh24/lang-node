const express = require("express");

const {
  goToSignUp,
  goToLogin,
  signUserUp,
  logUserIn,
} = require("../controllers/auth");

const router = express.Router();

router.get("/signup", goToSignUp);

router.post("/signup", signUserUp);

router.get("/login", goToLogin);

router.post("/login", logUserIn);

module.exports = router;
