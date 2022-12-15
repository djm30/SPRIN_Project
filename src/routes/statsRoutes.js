const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const authorize = require("../middleware/auth");
const {
    getStats,
    IncrementViewsEndpoint,
    IncrementUsersEndpoint,
    IncrementResourcesEndpoint,
    IncrementEventsEndpoint,
} = require("../controllers/statsController");

// Adding the associated endpoints to an express router to be added to the main application

router.get("/", authorize("admin"), asyncHandler(getStats));
router.post("/views", asyncHandler(IncrementViewsEndpoint));
router.post("/users", asyncHandler(IncrementUsersEndpoint));
router.post("/resources", asyncHandler(IncrementResourcesEndpoint));
router.post("/events", asyncHandler(IncrementEventsEndpoint));

module.exports = router;
