const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: false,
  },
  measures: {
    type: Array,
    required: false,
  },
  instruction: {
    type: Array,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("recipe", recipeSchema);
