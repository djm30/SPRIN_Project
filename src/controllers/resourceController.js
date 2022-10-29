const Resource = require("../models/Resource");
const resourceTypes = require("../config/resourceTypes");
const Logger = require("../config/logger");
const { uploadFile, replaceFile, deleteFile } = require("../utils/s3Service");
const {
  validateTitle,
  validateDescription,
  validateResourceType,
  validateResourceUrl,
} = require("../validation/Resource");
const authorizeUser = require("../utils/authorizeUser");
const { validateSync } = require("../validation/common");

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
  if (!validateSync(validateTitle, [title], res)) return res;

  // Description
  if (!validateSync(validateDescription, [description], res)) return res;

  // Resource Type
  if (!validateSync(validateResourceType, [resourceType], res)) return res;

  // Resource Url
  if (resourceType !== resourceTypes.pdf) {
    if (!validateSync(validateResourceUrl, [resourceType, resourceUrl], res))
      return res;
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
  if (!validateSync(validateTitle, [title], res)) return res;

  // Description
  if (!validateSync(validateDescription, [description], res)) return res;

  // Resource Type
  if (!validateSync(validateResourceType, [resourceType], res)) return res;

  // Resource Url
  if (resourceType !== resourceTypes.pdf) {
    if (!validateSync(validateResourceUrl, [resourceType, resourceUrl], res))
      return res;
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
  if (resource.resourceType === resourceTypes.pdf)
    await deleteFile(resource.resourceUrl);
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
