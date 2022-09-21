const Resource = require("../models/Resource");
const resourceTypes = require("../config/resourceTypes");
const Logger = require("../config/logger");

// UTIL METHODS

const validateTitle = (title) => {
  let success = true;
  let message = "";

  if (title.trim().length == 0) {
    success = false;
    message = "Please enter a title!";
  }
  return { success, message };
};

const validateDescription = (description) => {
  let success = true;
  let message = "";

  if (description.trim().length == 0) {
    success = false;
    message = "Please enter a title!";
  }

  if (description.trim().length > 240) {
    success = false;
    message = "Please keep the description under 240 characters!";
  }

  return { success, message };
};

const validateResourceType = (resourceType) => {
  let success = true;
  let message = "";

  let match = false;
  Object.entries(resourceTypes).forEach(([key, val]) => {
    if (resourceType === val) {
      match = true;
    }
  });

  if (!match) {
    success = false;
    message = "Please provide a valid resource type";
  }
  return { success, message };
};

// TODO - MORE VALIDATION
const validateResourceUrl = (resourceType, resourceUrl) => {
  let success = true;
  let message = "";

  if (
    (resourceType === resourceTypes.website ||
      resourceType === resourceTypes.youtube) &&
    !resourceUrl.trim()
  ) {
    success = false;
    message = "Please provide a valid URL!";
  }

  return { success, message };
};

const authorizeUser = async (reqUser, userID) => {
  if (reqUser.role !== "admin") {
    return reqUser._id.toString() === userID;
  }
};

// CONTROLLER METHODS

const getResource = async (req, res) => {
  const id = req.params.id;
  const resource = await Resource.findById(id);
  if (!resource) return res.sendStatus(404);
  res.status(200).json(resource);
};

const getResources = async (req, res) => {
  const resources = await Resource.find({});
  res.status(200).json(resources);
};

const createResource = async (req, res) => {
  const { title, description, resourceType, resourceUrl } = req.body;

  // Validation
  // Title
  const { titleSuccess, titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { descriptionSuccess, descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Resource Type
  const { resourceTypeSuccess, resourceTypeMessage } =
    validateResourceType(resourceType);
  if (!resourceTypeSuccess)
    return res.status(400).json({ message: resourceTypeMessage });

  // Resource Url
  const { resourceUrlSuccess, resourceUrlMessage } =
    validateResourceUrl(resourceUrl);
  if (!resourceUrlSuccess)
    return res.status(400).json({ message: resourceUrlMessage });

  const resource = new Resource({
    title,
    description,
    resourceType,
    resourceUrl,
    poster: req.user._id,
  });

  try {
    await resource.save();
    res.send(200).json(resource);
  } catch (e) {
    Logger.error(`Error: ${e}`);
    res.sendStatus(500);
  }
};

const updateResource = async (req, res) => {
  const id = req.params.id;
  const resource = await Resource.findById(id);
  if (!resource) return res.sendStatus(404);
  if (!authorizeUser(req.user, resource.poster.toString()))
    return res.sendStatus(403);

  const { title, description, resourceType, resourceUrl } = req.body;

  // Validation
  // Title
  const { titleSuccess, titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { descriptionSuccess, descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Resource Type
  const { resourceTypeSuccess, resourceTypeMessage } =
    validateResourceType(resourceType);
  if (!resourceTypeSuccess)
    return res.status(400).json({ message: resourceTypeMessage });

  // Resource Url
  const { resourceUrlSuccess, resourceUrlMessage } =
    validateResourceUrl(resourceUrl);
  if (!resourceUrlSuccess)
    return res.status(400).json({ message: resourceUrlMessage });

  resource.title = title;
  resource.description = description;
  resource.resourceType = resourceType;

  // TODO Handle file upload and delete here
  resource.resourceUrl = resourceUrl;
  resource.poster = req.user._id;

  try {
    await resource.save();
    res.send(200).json(resource);
  } catch (e) {
    Logger.error(`Error: ${e}`);
    res.sendStatus(500);
  }
};

const deleteResource = async (req, res) => {
  const id = req.params.id;
  const resource = await Resource.findById(id);
  if (!resource) return res.sendStatus(404);
  if (!authorizeUser(req.user, resource.poster.toString()))
    return res.sendStatus(403);
  await resource.remove();
  res.sendStatus(204);
};

module.exports = {
  getResource,
  getResources,
  createResource,
  updateResource,
  deleteResource,
};
