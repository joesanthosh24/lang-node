const express = require("express");

const { getAllLanguages, getLanguageById } = require("../controllers/language");

const router = express.Router();

router.get("/", getAllLanguages);

router.get("/:id", getLanguageById);

module.exports = router;
