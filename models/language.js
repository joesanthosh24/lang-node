const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  name: String,
  flagRoute: String,
});

module.exports = mongoose.model("Language", LanguageSchema);
