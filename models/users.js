const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1730543021622-80242a8db0a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  favoriteRecipesId: {
    type: Array,
    default: [],
  },
  schedule: {
    type: Array,
    default: [
      {
        dayIndex: 0,
        name: "Monday",
        scheduledRecipes: { breakfast: "", lunch: "", dinner: "" },
      },
      {
        dayIndex: 1,
        name: "Tuesday",
        scheduledRecipes: { breakfast: "", lunch: "", dinner: "" },
      },
      {
        dayIndex: 2,
        name: "Wednesday",
        scheduledRecipes: { breakfast: "", lunch: "", dinner: "" },
      },
      {
        dayIndex: 3,
        name: "Thursday",
        scheduledRecipes: { breakfast: "", lunch: "", dinner: "" },
      },
      {
        dayIndex: 4,
        name: "Friday",
        scheduledRecipes: { breakfast: "", lunch: "", dinner: "" },
      },
      {
        dayIndex: 5,
        name: "Saturday",
        scheduledRecipes: { breakfast: "", lunch: "", dinner: "" },
      },
      {
        dayIndex: 6,
        name: "Sunday",
        scheduledRecipes: { breakfast: "", lunch: "", dinner: "" },
      },
    ],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect password or email"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect password or email"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);