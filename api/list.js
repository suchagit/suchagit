import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Only load dotenv if running locally and .env.local exists
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

(/*
  export default async function handler(req, res) {
  try {
    console.log("PROCESS ENV: ", process.env);
    const auth = new google.auth.JWT(
      process.env.GDRIVE_CLIENT_EMAIL,
      null,
      process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/drive"]
    );

    const drive = google.drive({ version: "v3", auth });

    const response = await drive.files.list({
      q: `'${process.env.GDRIVE_FOLDER_ID}' in parents and trashed=false`,
      fields: "files(id, name, webViewLink)",
    });

    res.status(200).json(response.data.files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
  */}

  export default async function handler(req, res) {
  try {
    // Initialize OAuth2 client
    const auth = new google.auth.OAuth2(
      process.env.GDRIVE_CLIENT_ID,
      process.env.GDRIVE_CLIENT_SECRET
    );

    // Set refresh token (offline access)
    auth.setCredentials({
      refresh_token: process.env.GDRIVE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: "v3", auth });

    // List files inside your folder
    const response = await drive.files.list({
      q: `'${process.env.GDRIVE_FOLDER_ID}' in parents and trashed=false`,
      fields: "files(id, name, webViewLink)",
    });

    res.status(200).json(response.data.files);
  } catch (err) {
    console.error("Google Drive API error:", err);
    res.status(500).json({ error: err.message });
  }
}