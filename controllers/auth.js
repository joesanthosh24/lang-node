const Tutor = require("../models/tutors");
const Language = require("../models/language");
const Student = require("../models/student");

const goToSignUp = (req, res) => {
  res.render("auth/signup");
};

const goToLogin = (req, res) => {
  res.render("auth/login");
};

const signUserUp = async (req, res) => {
  let { name, email, password, account, language, hourlyRate } = req.body;

  if (account === "teacher") {
    const tutor = new Tutor({
      name,
      email,
      password,
      rating: 0,
      hourlyRate: Number(hourlyRate),
    });
    language = language.charAt(0).toUpperCase() + language.substring(1);
    let chosenLanguage = await Language.findOne({ name: language });

    tutor.language = chosenLanguage;
    tutor.students = [];
    await tutor.save();
  } else if (account === "student") {
    const student = new Student({
      name,
      email,
      password,
      tutors: [],
    });

    await student.save();
  }

  res.redirect("/tutors");
};

const logUserIn = async (req, res) => {
  let { email, password } = req.body;

  let user = await Tutor.findOne({ email, password });

  if (user) {
    res.redirect("/tutors");
  } else {
    user = await Student.findOne({ email, password });

    if (user) {
      res.redirect("/tutors");
    } else {
      res.redirect("/");
    }
  }
};

module.exports = { goToSignUp, goToLogin, signUserUp, logUserIn };
