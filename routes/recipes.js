const router = require("express").Router();

// Middlewares
const auth = require("../middlewares/auth");
const {
  validateCreateRecipe,
  validateRecipeId,
} = require("../middlewares/validation");

// Controllers
const {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipes");

// No authentification needed
router.get("/", getAllRecipes);

// Below routes are protected by auth
router.use(auth);

router.post("/", createRecipe);
router.delete("/", validateRecipeId, deleteRecipe);

module.exports = router;
