const router = require("express").Router();

const { getAllRecipes, createRecipe } = require("../controllers/recipes");

const { validateCreateRecipe } = require("../middlewares/validation");

router.get("/", getAllRecipes);
router.post("/", validateCreateRecipe, createRecipe);

module.exports = router;
