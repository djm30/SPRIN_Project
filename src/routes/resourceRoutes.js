const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const authorize = require("../middleware/auth");
const userRoles = require("../config/roles");
const {
    getResource,
    getResources,
    createResource,
    updateResource,
    deleteResource,
} = require("../controllers/resourceController");
const upload = require("../middleware/upload");

// Adding the associated endpoints to an express router to be added to the main application

router.get("/", asyncHandler(getResources));
router.get("/:id", asyncHandler(getResource));
router.post(
    "/",
    authorize(userRoles.ADMIN, userRoles.USER),
    upload.single("file"),
    asyncHandler(createResource),
);
router.put(
    "/:id",
    authorize(userRoles.ADMIN, userRoles.USER),
    upload.single("file"),
    asyncHandler(updateResource),
);
router.delete(
    "/:id",
    authorize(userRoles.ADMIN, userRoles.USER),
    asyncHandler(deleteResource),
);

module.exports = router;
