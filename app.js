const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");

const port = process.env.PORT || 3000;

// const Course = require("./models/course");
const Language = require("./models/language");
const Tutor = require("./models/tutors");

mongoose.connect("mongodb://localhost:27017/lang", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);

app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Courses routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/languages", async (req, res) => {
  const languages = await Language.find({});
  const languageTutorMap = {};

  for (let i = 0; i < languages.length; i++) {}

  res.render("languages/index", {
    languageList: languages,
  });
});

app.get("/tutors", async (req, res) => {
  const tutors = await Tutor.find({}).populate("language");

  res.render("tutors/index", {
    tutorList: tutors,
  });
});

app.get("/languages/:id", async (req, res) => {
  const language = await Language.findById(req.params.id);

  const tutors = await Tutor.find({ language });

  res.render("languages/language-show", { language, tutors });
});

app.get("/tutors/:id", async (req, res) => {
  const tutor = await Tutor.findById(req.params.id).populate("language");

  res.render("tutors/tutor-show", { tutor });
});

app.get("/auth/signup", (req, res) => {
  res.render("auth/signup");
});

app.post("/auth/signup", async (req, res) => {
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
  }

  res.redirect("/tutors");
});

app.get("/auth/login", (req, res) => {
  res.render("auth/login");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
