const Language = require("../models/language");
const Tutor = require("../models/tutors");

const getAllLanguages = async (req, res) => {
  const languages = await Language.find({});

  res.render("languages/index", {
    languageList: languages,
  });
};

const getLanguageById = async (req, res) => {
  const language = await Language.findById(req.params.id);

  const tutors = await Tutor.find({ language });

  res.render("languages/language-show", { language, tutors });
};

module.exports = { getAllLanguages, getLanguageById };
