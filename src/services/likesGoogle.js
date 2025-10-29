{/*
// likesGoogle.js
export async function fetchLikes(photoNames, inviteId) {
  try {
    const res = await fetch("/api/likes/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoIds: photoNames, inviteId }),
    });
    if (!res.ok) throw new Error("Failed to fetch likes");
    return await res.json(); // returns { photoId: { count, likedByUser } }
  } catch (err) {
    console.error("Error fetching likes:", err);
    return {};
  }
}

export async function toggleLike(photoName, inviteId) {
  try {
    const res = await fetch("/api/likes/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId: photoName, inviteId }),
    });
    if (!res.ok) throw new Error("Failed to toggle like");
    return await res.json();
  } catch (err) {
    console.error("Error toggling like:", err);
  }
}
*/}

import { supabase } from "../supabaseClient";

export async function fetchLikes(photoNames, inviteId) {
  const { data, error } = await supabase
    .from("likes")
    .select("photo_name, invite_id");
  if (error) throw error;

  const likeData = {};
  photoNames.forEach((name) => {
    const photoLikes = data.filter((row) => row.photo_name === name);
    likeData[name] = {
      count: photoLikes.length,
      likedByUser: photoLikes.some((row) => row.invite_id === inviteId),
    };
  });

  return likeData;
}

export async function toggleLike(photoName, inviteId) {
  const { data: existing } = await supabase
    .from("likes")
    .select("*")
    .match({ photo_name: photoName, invite_id: inviteId });

  if (existing?.length > 0) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ photo_name: photoName, invite_id: inviteId });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("likes")
      .insert([{ photo_name: photoName, invite_id: inviteId }]);
    if (error) throw error;
  }
}
