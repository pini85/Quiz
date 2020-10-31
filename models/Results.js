const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResultsSchema = new Schema({
  answers: {
    type: [],
    required: true,
  },
  answeredToUserId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const results = mongoose.model("Results", ResultsSchema);

module.exports = results;
