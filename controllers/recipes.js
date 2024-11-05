// Import schema
const recipes = require("../models/recipes");

// Sends all recipes from recipes collection
module.exports.getAllRecipes = (req, res, next) => {
  recipes
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

// Add an item to the recipes collection
module.exports.createRecipe = (req, res, next) => {
  const { name, image, ingredients, measures, instructions } = req.body;
  recipes
    .create({ name, image, ingredients, measures, instructions })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Data is not valid"));
      } else {
        next(err);
      }
    });
};
