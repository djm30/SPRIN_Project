const S3 = require("aws-sdk/clients/s3");
const {
    AWS_BUCKET,
    AWS_REGION,
    AWS_SECRET,
    AWS_ACCESS,
} = require("../config/config");
const fs = require("fs");
const { unlink } = require("fs");
const Logger = require("../config/logger");

const bucketUrl = "https://sprin-storage-bucket.s3.eu-west-1.amazonaws.com/";

// Establishing connection to AWS S3
const s3 = new S3({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS,
        secretAccessKey: AWS_SECRET,
    },
});

const validateFile = () => {};

/**
 *
 * @param {*} filename
 *
 */
const uploadFile = async (file, contentType = "application/octet-stream") => {
    const fileStream = fs.createReadStream(file.path);

    const extension = "." + file.originalname.split(".").pop();

    console.log(contentType);

    const uploadParams = {
        Bucket: AWS_BUCKET,
        Body: fileStream,
        Key: file.filename + extension,
        ContentType: contentType,
        ACl: "public-read",
    };

    let location;
    try {
        const response = await s3.upload(uploadParams).promise();
        Logger.info(`Uploading ${file.originalname} to S3`);
        location = response.Location;
    } catch (e) {
        Logger.error(`Error: ${e}`);
    }

    // Cleaning up uploaded file and deleting it from the server
    await fileStream.close();
    try {
        unlink(file.path, () => {
            Logger.info("File Cleaned up");
        });
    } catch (e) {
        Logger.error(`Error: ${e}`);
    }
    return location;
};

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

const deleteFile = async (resourceUrl) => {
    // Getting name of old file on bucket
    const key = resourceUrl.replace(bucketUrl, "");
    const deleteParms = {
        Bucket: AWS_BUCKET,
        Key: key,
    };

    const response = await s3.deleteObject(deleteParms).promise();
    Logger.info(`S3 Delete Response ${response}`);
};
module.exports = { uploadFile, replaceFile, deleteFile };
