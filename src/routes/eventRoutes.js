const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const authorize = require("../middleware/auth");
const userRoles = require("../config/roles");
const {
    getEvent,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/eventController");
const upload = require("../middleware/upload");

// Adding the associated endpoints to an express router to be added to the main application

router.get("/", asyncHandler(getEvents));
router.get("/:id", asyncHandler(getEvent));
router.post(
    "/",
    authorize(userRoles.ADMIN),
    upload.single("file"),
    asyncHandler(createEvent),
);
router.put(
    "/:id",
    authorize(userRoles.ADMIN),
    upload.single("file"),
    asyncHandler(updateEvent),
);
router.delete("/:id", authorize(userRoles.ADMIN), asyncHandler(deleteEvent));

module.exports = router;
