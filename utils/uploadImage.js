const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "./credentials/datastore-API.json",
});

function uploadImage(bucketName, bufferStream) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file('image.png');
  bufferStream.pipe(file.createWriteStream({
    metadata: {
      contentType: 'image/png',
      metadata: {
        custom: 'metadata',
        cacheControl: 'no-cache'
      },
      public: true
    }
  }))
  .on('error', function(err) {console.log(err);})
  .on('finish', function() {
    console.log('jmeker');
    // The file upload is complete.
  });
}

module.exports = uploadImage;
