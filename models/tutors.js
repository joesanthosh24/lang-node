const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
  name: String,
  rating: Number,
  language: {
    type: Schema.Types.ObjectId,
    ref: "Language",
  },
});

module.exports = mongoose.model("Tutor", TutorSchema);
