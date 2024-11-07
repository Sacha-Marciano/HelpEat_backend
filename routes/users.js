const router = require("express").Router();

// Import middlewares
const auth = require("../middlewares/auth");
const {
  validateRecipeId,
  validateScheduleAdd,
  validateScheduleDelete,
  validateOwnerId,
} = require("../middlewares/validation");

const {
  getCurrentUser,
  addFavorite,
  deleteFavorite,
  addRecipeSchedule,
  deleteRecipeSchedule,
  getUsername,
} = require("../controllers/users");

// No auth required
router.get("/:userId/name", validateOwnerId, getUsername);

// Below routes are protected by auth
router.use(auth);

router.get("/me", getCurrentUser);

router.post("/favorite", validateRecipeId, addFavorite);
router.delete("/favorite", validateRecipeId, deleteFavorite);

router.post("/schedule", validateScheduleAdd, addRecipeSchedule);
router.delete("/schedule", validateScheduleDelete, deleteRecipeSchedule);

module.exports = router;
