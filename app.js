const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");

const port = process.env.PORT || 3000;

const languageRouter = require("./routes/languages");
const tutorRouter = require("./routes/tutors");
const authRouter = require("./routes/auth");

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

app.use("/languages", languageRouter);
app.use("/tutors", tutorRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
