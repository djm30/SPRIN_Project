const Resource = require("../models/Resource");
const resourceTypes = require("../config/resourceTypes");
const Logger = require("../config/logger");
const { uploadFile, replaceFile, deleteFile } = require("../utils/s3Service");

// UTIL METHODS

const validateTitle = (title) => {
  let success = true;
  let message = "";

  if (!title || title.trim().length === 0) {
    success = false;
    message = "Please enter a title!";
  }
  return { success, message };
};

const validateDescription = (description) => {
  let success = true;
  let message = "";

  if (!description || description.trim().length === 0) {
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

  if (!resourceType) {
    success = false;
    message = "Please provide a resource type";
  }

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

  if (resourceType === resourceTypes.youtube) {
    const regex =
      /^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
    if (!regex.test(resourceUrl)) {
      success = false;
      message = "Please provide a valid YouTube url";
    }
  }

  if (resourceType === resourceTypes.website) {
    if (resourceUrl.substring(0, 5) !== "https") {
      success = false;
      message = "Please ensure URL begins with https";
    }
    const regex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (!regex.test(resourceUrl)) {
      success = false;
      message = "Please provide a valid URL";
    }
  }

  return { success, message };
};

// Checks if user is either an admin, or is the owner of the requested resource
const authorizeUser = (reqUser, userID) => {
  if (reqUser.role !== "admin") {
    return reqUser._id.toString() === userID.toString();
  }
  return true;
};

// CONTROLLER METHODS
// Returns a resource from a given id
const getResource = async (req, res) => {
  const { id } = req.params;
  const resource = await Resource.findById(id);
  if (!resource) return res.sendStatus(404);
  res.status(200).json(resource);
};

// Returns all resources
const getResources = async (req, res) => {
  const resources = await Resource.find({});
  res.status(200).json(resources);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createResource = async (req, res) => {
  const { title, description, resourceType } = req.body;
  let { resourceUrl } = req.body;

  // Validation
  // Title
  const { success: titleSuccess, message: titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { success: descriptionSuccess, message: descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Resource Type
  const { success: resourceTypeSuccess, message: resourceTypeMessage } =
    validateResourceType(resourceType);
  if (!resourceTypeSuccess)
    return res.status(400).json({ message: resourceTypeMessage });

  // Resource Url
  if (resourceType !== resourceTypes.website) {
    const { success: resourceUrlSuccess, message: resourceUrlMessage } =
      validateResourceUrl(resourceUrl);
    if (!resourceUrlSuccess)
      return res.status(400).json({ message: resourceUrlMessage });
  }

  if (
    resourceType !== resourceTypes.website &&
    resourceType !== resourceTypes.youtube
  ) {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Please upload a file" });
    resourceUrl = await uploadFile(file);
    if (!resourceUrl)
      return res
        .status(500)
        .json({ message: "Something went wrong uploading, please try again" });
  }

  const resource = new Resource({
    title,
    description,
    resourceType,
    resourceUrl,
    poster: req.user._id,
  });

  try {
    await resource.save();
    res.status(200).json(resource);
  } catch (e) {
    Logger.error(`Error: ${e}`);
    throw e;
  }
};

const updateResource = async (req, res) => {
  const id = req.params.id;
  const resource = await Resource.findById(id);
  if (!resource) return res.sendStatus(404);
  if (!authorizeUser(req.user, resource.poster)) return res.sendStatus(403);

  const { title, description, resourceType } = req.body;
  let { resourceUrl } = req.body;

  // Validation
  // Title
  const { success: titleSuccess, message: titleMessage } = validateTitle(title);
  if (!titleSuccess) return res.status(400).json({ message: titleMessage });

  // Description
  const { success: descriptionSuccess, message: descriptionMessage } =
    validateDescription(description);
  if (!descriptionSuccess)
    return res.status(400).json({ message: descriptionMessage });

  // Resource Type
  const { success: resourceTypeSuccess, message: resourceTypeMessage } =
    validateResourceType(resourceType);
  if (!resourceTypeSuccess)
    return res.status(400).json({ message: resourceTypeMessage });

  // Resource Url
  if (resourceType !== resourceTypes.website) {
    const { success: resourceUrlSuccess, message: resourceUrlMessage } =
      validateResourceUrl(resourceUrl);
    if (!resourceUrlSuccess)
      return res.status(400).json({ message: resourceUrlMessage });
  }

  // Checking if a new file
  if (resourceType !== resourceTypes.website) {
    const file = req.file;
    if (file) {
      resourceUrl = await replaceFile(resource.resourceUrl, file);
      if (!resourceUrl)
        return res.status(500).json({
          message: "Something went wrong uploading, please try again",
        });
    } else {
      resourceUrl = resource.resourceUrl;
    }
  }

  resource.title = title;
  resource.description = description;
  resource.resourceType = resourceType;
  resource.resourceUrl = resourceUrl;

  try {
    await resource.save();
    res.status(200).json(resource);
  } catch (e) {
    Logger.error(`Error: ${e}`);
    res.sendStatus(500);
  }
};

const deleteResource = async (req, res) => {
  const id = req.params.id;
  const resource = await Resource.findById(id);
  if (!resource) return res.sendStatus(204);
  if (!authorizeUser(req.user, resource.poster)) return res.sendStatus(403);
  if (
    resource.resourceType !== resourceTypes.website ||
    resource.resourceType !== resourceTypes.youtube
  )
    await deleteFile(resource.resourceUrl);
  await resource.remove();
  res.sendStatus(204);
};

const exportedForTesting = {
  validateTitle,
  validateDescription,
  validateResourceUrl,
  validateResourceType,
};

module.exports = {
  getResource,
  getResources,
  createResource,
  updateResource,
  deleteResource,
  exportedForTesting,
};
