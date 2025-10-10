// storageSupabase.js
import { supabase } from "../supabaseClient";

export async function listPhotos() {
  const { data, error } = await supabase.storage
    .from("uploads")
    .list("", { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });
  if (error) throw error;
  return data;
}

export async function getPhotoUrl(filename) {
  const { data } = await supabase.storage
    .from("uploads")
    .createSignedUrl(filename, 300); // valid 5 min
  return data.signedUrl;
}

export async function deletePhoto(filename) {
  const { error } = await supabase.storage
    .from("uploads")
    .remove([filename]);
  if (error) throw error;
}

export async function uploadPhoto(fileName, file) {
  const { error } = await supabase.storage
    .from("uploads")
    .upload(fileName, file);
  return error || null;
}
