const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
  name: String,
  rating: Number,
  language: {
    type: Schema.Types.ObjectId,
    ref: "Language",
  },
  hourlyRate: Number,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  email: String,
  password: String,
});

module.exports = mongoose.model("Tutor", TutorSchema);
