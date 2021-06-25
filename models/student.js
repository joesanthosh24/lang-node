const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  tutors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
    },
  ],
  email: String,
  password: String,
});

module.exports = mongoose.model("Student", StudentSchema);
