const express = require("express");

const { goToSignUp, goToLogin, signUserUp } = require("../controllers/auth");

const router = express.Router();

router.get("/signup", goToSignUp);

router.post("/signup", signUserUp);

router.get("/login", goToLogin);

module.exports = router;
