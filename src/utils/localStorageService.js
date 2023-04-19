const fs = require("fs");
const Logger = require("../config/logger");
const path = require("path");

// Reads file from the system, and then proceeds to upload it to S3
const uploadFile = async (file, contentType = "application/octet-stream") => {
    try {
        // const fileStream = fs.createReadStream(file.path);

        const extension = "." + file.originalname.split(".").pop();

        const newName = file.filename + extension;

        fs.rename(file.path, file.destination + "/" + newName, (err) => {
            if (err) throw err;
        });

        return newName;
    } catch (e) {
        Logger.error(`Error: ${e}`);
    }
};

// Replaces a file on S3 with a new one
const replaceFile = async (oldResourceUrl, file, contentType) => {
    let newLocation;

    try {
        await deleteFile(oldResourceUrl);
        newLocation = uploadFile(file, contentType);
    } catch (e) {
        Logger.error(`Error: ${e}`);
    }

    return newLocation;
};

// Deletes a file from S3
const deleteFile = async (resourceUrl) => {
    // Delete the file in the uploads folder
    fs.unlink(path.join(__dirname, "../uploads/" + resourceUrl), (err) => {
        if (err) {
            Logger.error(`Error: ${err}`);
        }
    });
};
module.exports = { uploadFile, replaceFile, deleteFile };
