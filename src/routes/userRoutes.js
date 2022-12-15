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
    (req, res, next) => {
        // Checking if there are any missing fields before passing to passport for login
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        } else {
            next();
        }
    },
    passport.authenticate("local"),
    asyncHandler(login),
);
router.post("/logout", asyncHandler(logout));
router.post("/reauthenticate", asyncHandler(reauthenticate));

module.exports = router;
