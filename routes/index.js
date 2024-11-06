// Import express router
const router = require("express").Router();

// Import specific routers
const recipesRouter = require("./recipes");
const usersRouter = require("./users");

// Import controllers for signin/up
const { createUser, login } = require("../controllers/users");

// Import middlewares
const {
  validateLogin,
  validateCreateUser,
} = require("../middlewares/validation");

// Import 404 error
const NotFoundError = require("../utils/errors/NotFoundError");

// For crash test
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// For known endpoints
router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);
router.use("/recipes", recipesRouter);
router.use("/users", usersRouter);

// For unknown routes
router.use((req, res, next) => {
  next(new NotFoundError("Invalid route"));
});

module.exports = router;
