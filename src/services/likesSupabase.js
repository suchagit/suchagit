// likesSupabase.js
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
  // Check if already liked
  const { data: existing } = await supabase
    .from("likes")
    .select("*")
    .match({ photo_name: photoName, invite_id: inviteId });

  if (existing?.length > 0) {
    // Unlike
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ photo_name: photoName, invite_id: inviteId });
    if (error) throw error;
  } else {
    // Like
    const { error } = await supabase
      .from("likes")
      .insert([{ photo_name: photoName, invite_id: inviteId }]);
    if (error) throw error;
  }
}
