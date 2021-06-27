const express = require("express");

const { getAllTutors, getTutorById } = require("../controllers/tutor");

const router = express.Router();

router.get("/", getAllTutors);

router.get("/:id", getTutorById);

module.exports = router;
