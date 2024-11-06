const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

const validateIndex = (value, helpers) => {
  if (value >= 0 && value <= 6) {
    return value;
  }
  return helpers.error("string.index");
};

module.exports.validateCreateRecipe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    ingredients: Joi.array(),
    measures: Joi.array(),
    instructions: Joi.array(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'the "Email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "Email" field must be filled in',
      "string.email": 'the "Email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "Password" field must be filled in',
    }),
  }),
});

module.exports.validateRecipeId = celebrate({
  body: Joi.object().keys({
    recipeId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateScheduleAdd = celebrate({
  body: Joi.object().keys({
    dayIndex: Joi.number().required().custom(validateIndex).messages({
      "string.empty": 'The "dayIndex" field must be filled in',
      "string.index": 'the "dayIndex" field must be a valid email',
    }),
    time: Joi.string().required().valid("breakfast", "lunch", "dinner"),
    recipeId: Joi.string().required().hex().length(24),
  }),
});

module.exports.validateScheduleDelete = celebrate({
  body: Joi.object().keys({
    dayIndex: Joi.number().required().custom(validateIndex).messages({
      "string.empty": 'The "dayIndex" field must be filled in',
      "string.index": 'the "dayIndex" field must be a valid email',
    }),
    time: Joi.string().required().valid("breakfast", "lunch", "dinner"),
  }),
});
