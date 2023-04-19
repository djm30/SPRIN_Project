const S3 = require("aws-sdk/clients/s3");
const {
    AWS_BUCKET,
    AWS_REGION,
    AWS_SECRET,
    AWS_ACCESS,
} = require("../config/config");
const fs = require("fs");
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

// Reads file from the system, and then proceeds to upload it to S3
const uploadFile = async (file, contentType = "application/octet-stream") => {
    try {
        const fileStream = fs.createReadStream(file.path);

        const extension = "." + file.originalname.split(".").pop();

        const uploadParams = {
            Bucket: AWS_BUCKET,
            Body: fileStream,
            Key: file.filename + extension,
            ContentType: contentType,
            ACl: "public-read",
        };

        let location;

        // uploading the file to S3 and returning the location url of the file
        const response = await s3.upload(uploadParams).promise();
        Logger.info(`Uploading ${file.originalname} to S3`);
        location = response.Location;

        // Cleaning up uploaded file and deleting it from the server
        await fileStream.close();

        return location;
    } catch (e) {
        Logger.error(`Error: ${e}`);
    } finally {
        // Delete the file from the local file system
        // fs.unlink(file.path, (err) => {
        //     if (err) {
        //         Logger.error(`Error: ${err}`);
        //     }
        // });
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
