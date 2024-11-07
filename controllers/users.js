// Import hash encryption
const bcrypt = require("bcryptjs");

// Import token handler and signature key
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Import schemas
const users = require("../models/users");
const recipes = require("../models/recipes");

// Import schema and customized errors
const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const ConflictError = require("../utils/errors/ConflictError");

// Sends user's info from users collection
module.exports.getCurrentUser = (req, res, next) => {
  users
    .findById(req.user._id)
    .then((user) => {
      res.send(user);
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

// Sends sends username for owner name
module.exports.getUsername = (req, res, next) => {
  users
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      const response = { ownerName: user.name };
      res.send(response);
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

// Create a new user based on request body
module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => users.create({ name, email, password: hash }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "MongoServerError") {
        next(new ConflictError("User with this email already exists"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Invalid data");
  }
  return users
    .findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user.id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect password or email") {
        next(new UnauthorizedError("Authentication error"));
      } else {
        next(err);
      }
    });
};

// Add recipeId to user's favorite array
module.exports.addFavorite = (req, res, next) => {
  const { recipeId } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favoriteRecipesId: recipeId } },
      { new: true },
    )
    .orFail()
    .then((data) => {
      res.send(data.favoriteRecipesId);
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

// Delete recipeId from user's favorite array
module.exports.deleteFavorite = (req, res, next) => {
  const { recipeId } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      { $pull: { favoriteRecipesId: recipeId } },
      { new: true },
    )
    .orFail()
    .then((data) => {
      res.send(data.favoriteRecipesId);
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

// Add recipeId (from params) to user's schedule array
module.exports.addRecipeSchedule = (req, res, next) => {
  const { dayIndex, time, recipeId } = req.body;
  recipes
    .findById(recipeId)
    .orFail()
    .then(() => {
      users
        .findByIdAndUpdate(
          req.user._id,
          {
            [`schedule.${dayIndex}.scheduledRecipes.${time}`]: recipeId,
          },
          { new: true },
        )
        .orFail()
        .then((data) => {
          res.send(data.schedule);
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

// Delete recipeId from user's schedule array
module.exports.deleteRecipeSchedule = (req, res, next) => {
  const { dayIndex, time } = req.body;
  users
    .findByIdAndUpdate(
      req.user._id,
      {
        [`schedule.${dayIndex}.scheduledRecipes.${time}`]: "",
      },
      { new: true },
    )
    .orFail()
    .then((data) => {
      res.send(data.schedule);
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
