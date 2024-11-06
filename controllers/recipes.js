// Import mongoose for ObjectId
const mongoose = require("mongoose");

// Import schema
const recipes = require("../models/recipes");

// Import errors
const BadRequestError = require("../utils/errors/BadRequestError");
const ForbiddenError = require("../utils/errors/ForbiddenError");
const NotFoundError = require("../utils/errors/NotFoundError");

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
  const owner = req.user._id;
  recipes
    .create({ name, image, ingredients, measures, instructions, owner })
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

// Delete item if user is owner
module.exports.deleteRecipe = (req, res, next) => {
  const { recipeId } = req.body;
  return recipes
    .findById(recipeId)
    .orFail()
    .then((item) => {
      const userId = JSON.stringify(new mongoose.Types.ObjectId(req.user._id));
      const ownerId = JSON.stringify(item.owner);
      if (ownerId !== userId) {
        throw new ForbiddenError("This user is not the owner of the recipe");
      }

      return recipes
        .findByIdAndRemove(recipeId)
        .orFail()
        .then((data) => {
          res.send(data);
        });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Data not found"));
      } else if (err.name === "CastError" || err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};
