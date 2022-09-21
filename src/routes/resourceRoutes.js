const authorize = require("../middleware/auth");
const userRoles = require("../config/roles");
const asyncHandler = require("express-async-handler");
const {
  getResource,
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");
const router = require("express").Router();

router.get(
  "/",
  authorize(userRoles.ADMIN, userRoles.USER),
  asyncHandler(getResources),
);
router.get(
  "/:id",
  authorize(userRoles.ADMIN, userRoles.USER),
  asyncHandler(getResource),
);
router.post(
  "/",
  authorize(userRoles.ADMIN, userRoles.USER),
  asyncHandler(createResource),
);
router.put(
  "/:id",
  authorize(userRoles.ADMIN, userRoles.USER),
  asyncHandler(updateResource),
);
router.delete(
  "/:id",
  authorize(userRoles.ADMIN, userRoles.USER),
  asyncHandler(deleteResource),
);

module.exports = router;
