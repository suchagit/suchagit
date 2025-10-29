// fetch likes for a list of photo IDs
import { google } from "googleapis"; // optional if you store likes in Google Sheets, Drive metadata, or Firestore
// For simplicity, we’ll use a JSON file in Vercel KV or a small in-memory store for testing
// In production, you could connect to Firestore or Supabase DB

let likesStore = {}; // photoId -> array of inviteIds
// NOTE: in serverless functions this resets each invocation. Use a real DB for persistence

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { photoIds, inviteId } = req.body;
  if (!photoIds || !inviteId) return res.status(400).json({ error: "Missing parameters" });

  const result = {};
  photoIds.forEach((id) => {
    const likedBy = likesStore[id] || [];
    result[id] = {
      count: likedBy.length,
      likedByUser: likedBy.includes(inviteId),
    };
  });

  res.status(200).json(result);
}
