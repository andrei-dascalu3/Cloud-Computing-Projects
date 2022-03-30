const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "./credentials/datastore-API.json",
});

async function uploadImage(bucketName, filePath, destFileName) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}

async function uploadBuffer(bucketName, buffer, uuid) {
  const fileHandle = storage.bucket(bucketName).file(`${uuid}.png`);
  const [ fileExists ] = await fileHandle.exists();
  return fileHandle.save(buffer);
}

module.exports = uploadBuffer;
