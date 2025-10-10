// src/services/storageGoogle.js
import { uploadFileToGoogle, listFilesFromBucket, getSignedUrlFromGoogle } from "./googleCloudHelpers";

export async function uploadPhoto(fileName, file) {
  try {
    await uploadFileToGoogle("your-bucket-name", fileName, file);
    return null; // no error
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function listPhotos() {
  const files = await listFilesFromBucket("your-bucket-name");
  return files.map((f) => ({ name: f.name }));
}

export async function getPhotoUrl(fileName) {
  return await getSignedUrlFromGoogle("your-bucket-name", fileName, 300);
}

export async function deletePhoto(filename) {
  return deleteFile(filename);
}
