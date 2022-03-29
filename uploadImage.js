const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

async function uploadImage(bucketName, filePath, destFileName) {
    await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
}

module.exports = uploadImage;