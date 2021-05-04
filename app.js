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

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
