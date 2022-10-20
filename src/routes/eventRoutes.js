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
const upload = require("../middleware/upload");
const router = require("express").Router();

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
