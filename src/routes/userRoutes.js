const authorize = require("../middleware/auth");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const roles = require("../config/roles");
const {
  getUser,
  getUsers,
  approveUser,
  registerUser,
  deleteUser,
  editUser,
  login,
  logout,
  reauthenticate,
} = require("../controllers/userController");

const router = require("express").Router();

// Only admin
router.get("/", authorize("admin"), asyncHandler(getUsers));

router.get("/:id", asyncHandler(getUser));

// Only admin
router.post("/approve/:id", authorize(roles.ADMIN), asyncHandler(approveUser));

router.post("/register", asyncHandler(registerUser));

// Only admin or account holder
router.put("/:id", authorize(roles.ADMIN, roles.USER), asyncHandler(editUser));
router.delete(
  "/:id",
  authorize(roles.ADMIN, roles.USER),
  asyncHandler(deleteUser),
);

router.post("/login", passport.authenticate("local"), asyncHandler(login));
router.post("/logout", asyncHandler(logout));
router.post(
  "/reauthenticate",
  authorize(roles.ADMIN, roles.USER),
  asyncHandler(reauthenticate),
);

module.exports = router;
