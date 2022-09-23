const authorize = require("../middleware/auth");
const userRoles = require("../config/roles");
const asyncHandler = require("express-async-handler");
const {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const router = require("express").Router();

router.get("/", asyncHandler(getEvents));
router.get("/:id", asyncHandler(getEvent));
router.post("/", authorize(userRoles.ADMIN), asyncHandler(createEvent));
router.put("/:id", authorize(userRoles.ADMIN), asyncHandler(updateEvent));
router.delete("/:id", authorize(userRoles.ADMIN), asyncHandler(deleteEvent));

module.exports = router;
