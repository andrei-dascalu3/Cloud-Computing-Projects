const {Storage} = require('@google-cloud/storage');

const storage = new Storage({keyFilename: './credentials/cloud-computing-hw-3-345510-adf1f581252b.json'});

async function uploadImage(bucketName, filePath, destFileName) {
    await storage.bucket(bucketName).upload(filePath, {
      destination: destFileName,
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
}

module.exports = uploadImage;