const authorize = require("../middleware/auth");
const asyncHandler = require("express-async-handler");
const {
  getStats,
  IncrementViewsEndpoint,
  IncrementUsersEndpoint,
  IncrementResourcesEndpoint,
  IncrementEventsEndpoint,
} = require("../controllers/statsController");
const router = require("express").Router();

// router.get("/", authorize("admin"), asyncHandler(getStats));
router.get("/", asyncHandler(getStats));
router.post("/views", asyncHandler(IncrementViewsEndpoint));
router.post("/users", asyncHandler(IncrementUsersEndpoint));
router.post("/resources", asyncHandler(IncrementResourcesEndpoint));
router.post("/events", asyncHandler(IncrementEventsEndpoint));

module.exports = router;
