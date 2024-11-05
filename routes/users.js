const router = require("express").Router();

const {
  getCurrentUser,
  addFavorite,
  deleteFavorite,
  addRecipeSchedule,
  deleteRecipeSchedule,
} = require("../controllers/users");

const {
  validateRecipeId,
  validateScheduleAdd,
  validateScheduleDelete,
} = require("../middlewares/validation");

router.get("/", getCurrentUser);

router.post("/favorite", validateRecipeId, addFavorite);
router.delete("/favorite", validateRecipeId, deleteFavorite);

router.post("/schedule", validateScheduleAdd, addRecipeSchedule);
router.delete("/schedule", validateScheduleDelete, deleteRecipeSchedule);

module.exports = router;
