const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Course = require("./models/course");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Courses routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/courses", async (req, res) => {
  const courses = await Course.find({});

  res.render("courses/index", {
    courseList: courses,
  });
});

app.post("/courses", async (req, res) => {
  const course = new Course(req.body.course);

  await course.save();

  res.redirect(`/courses/${course._id}`);
});

app.get("/courses/new", (req, res) => {
  res.render("courses/course-new");
});

app.get("/courses/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);

  res.render("courses/course-show", { course });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
