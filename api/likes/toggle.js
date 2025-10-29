let likesStore = {}; // same note as above, use a real DB in production

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { photoId, inviteId } = req.body;
  if (!photoId || !inviteId) return res.status(400).json({ error: "Missing parameters" });

  likesStore[photoId] = likesStore[photoId] || [];
  const liked = likesStore[photoId].includes(inviteId);

  if (liked) {
    // Unlike
    likesStore[photoId] = likesStore[photoId].filter((id) => id !== inviteId);
  } else {
    // Like
    likesStore[photoId].push(inviteId);
  }

  res.status(200).json({ success: true });
}
