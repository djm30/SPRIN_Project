const authorize = require("../middleware/auth");
const asyncHandler = require("express-async-handler");
const {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const router = require("express").Router();

router.get("/", authorize("admin"), asyncHandler(getEvents));
router.get("/:id", authorize("admin"), asyncHandler(getEvent));
router.post("/", authorize("admin"), asyncHandler(createEvent));
router.put("/:id", authorize("admin"), asyncHandler(updateEvent));
router.delete("/:id", authorize("admin"), asyncHandler(deleteEvent));

module.exports = router;
