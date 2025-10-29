import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Only load dotenv if running locally and .env.local exists
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

export default async function handler(req, res) {
  try {
    const { fileId } = req.query;

    const auth = new google.auth.JWT(
      process.env.GDRIVE_CLIENT_EMAIL,
      null,
      process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/drive"]
    );

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.get({
      fileId,
      fields: "id, name, webViewLink",
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
