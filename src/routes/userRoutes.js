const authorize = require("../middleware/auth");
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
} = require("../controllers/userController");
const app = require("../app");
const router = require("express").Router();

// Only admin
router.get("/", authorize("admin"), getUsers);

router.get("/:id", getUser);

// Only admin
router.post("/approve/:id", authorize(roles.ADMIN), approveUser);

router.post("/register", registerUser);

// Only admin or account holder
router.put("/:id", authorize(roles.ADMIN, roles.USER), editUser);
router.delete("/:id", authorize(roles.ADMIN, roles.USER), deleteUser);

router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);

module.exports = router;
