const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const roles = require("../config/roles");
const authorize = require("../middleware/auth");
const {
    getUser,
    getUsers,
    approveUser,
    registerUser,
    preLogin,
    deleteUser,
    editUser,
    login,
    logout,
    reauthenticate,
} = require("../controllers/userController");

// Adding the associated endpoints to an express router to be added to the main application

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

router.post(
    "/login",
    preLogin,
    passport.authenticate("local"),
    asyncHandler(login),
);
router.post("/logout", asyncHandler(logout));
router.post("/reauthenticate", asyncHandler(reauthenticate));

module.exports = router;
