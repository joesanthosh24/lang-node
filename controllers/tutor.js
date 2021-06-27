const Tutor = require("../models/tutors");

const getAllTutors = async (req, res) => {
  const tutors = await Tutor.find({}).populate("language");

  res.render("tutors/index", {
    tutorList: tutors,
  });
};

const getTutorById = async (req, res) => {
  const tutor = await Tutor.findById(req.params.id).populate("language");

  res.render("tutors/tutor-show", { tutor });
};

module.exports = { getAllTutors, getTutorById };
