const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [],
    required: true,
  },
});

const Questions = mongoose.model("Questions", QuestionsSchema);

module.exports = Questions;
