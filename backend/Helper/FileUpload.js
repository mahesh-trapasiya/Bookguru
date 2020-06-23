const { Storage } = require("@google-cloud/storage");
const md5 = require("md5");

exports.uploadImageToFirebase = (file) => {
  const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
  });

  const bucket = storage.bucket(`${process.env.GCLOUD_STORAGE_BUCKET_URL}`);
  let publicUrl;

  try {
    const blob = bucket.file(`books/${md5(Date.now()) + file.originalname}`);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    // If there's an error
    blobStream.on("error", (err) => console.log("err while uploading+ " + err));

    // If all is good and done
    blobStream.on("finish", () => {});
    publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(blob.name)}?alt=media`;

    blobStream.end(file.buffer);
    return publicUrl;
    // When there is no more data to be consumed from the stream the end event gets emitted
  } catch (error) {
    return error;
  }
};
