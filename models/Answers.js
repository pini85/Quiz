const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnswersSchema = new Schema({
  answers: {
    type: [],
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const answers = mongoose.model("Answers", AnswersSchema);
module.exports = answers;
