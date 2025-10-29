// src/services/storageGoogle.js
/*
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
*/
// storageGoogle.js
// Adapter for Gallery: keeps Gallery code unchanged


{/*
export async function uploadPhoto(fileName, file) {
  try {
    // Convert File to Base64 for sending to serverless backend
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName,
        base64Data,
        mimeType: file.type,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");

    // Return object compatible with Gallery
    return { name: data.fileId, url: data.webViewLink };
  } catch (err) {
    console.error("Upload failed:", err);
    return null;
  }
}

export async function listPhotos() {
  try {
    const res = await fetch("/api/list");
    if (!res.ok) throw new Error("Failed to fetch photos");

    const files = await res.json();

    // Map Drive API response to Gallery format
    return files.map((f) => ({
      name: f.id,         // Gallery expects 'name', we use fileId internally
      url: f.webViewLink, // Gallery expects 'url'
    }));
  } catch (err) {
    console.error("Error listing photos:", err);
    return [];
  }
}

export async function getPhotoUrl(fileId) {
  try {
    const res = await fetch(`/api/getUrl?fileId=${encodeURIComponent(fileId)}`);
    if (!res.ok) throw new Error("Failed to get photo URL");
    const data = await res.json();
    return data.webViewLink;
  } catch (err) {
    console.error("Error getting photo URL:", err);
    return "";
  }
}

export async function deletePhoto(fileId) {
  try {
    const res = await fetch("/api/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Delete failed");
    return true;
  } catch (err) {
    console.error("Error deleting photo:", err);
    return false;
  }
}
  */}

// storageGoogle.js
// Since the folder is public, we just store links in an array or Supabase table

import { supabase } from "../supabaseClient";

// Fetch all photo links from Supabase
export async function listPhotos() {
  const { data, error } = await supabase
    .from("photos")
    .select("name, url")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
}

// Get URL for a photo by name
export async function getPhotoUrl(filename) {
  const { data, error } = await supabase
    .from("photos")
    .select("url")
    .eq("name", filename)
    .single();
  if (error) throw error;
  return data.url;
}

// Upload photo
// Since you cannot programmatically upload to a public folder, just store the link in Supabase
export async function uploadPhoto(fileName, fileUrl) {
  const { error } = await supabase
    .from("photos")
    .insert([{ name: fileName, url: fileUrl }]);
  if (error) throw error;
  return null;
}

// Delete photo link
export async function deletePhoto(filename) {
  const { error } = await supabase
    .from("photos")
    .delete()
    .eq("name", filename);
  if (error) throw error;
}

