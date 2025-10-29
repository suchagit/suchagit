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
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { fileName, base64Data, mimeType } = req.body;

    const auth = new google.auth.JWT(
      process.env.GDRIVE_CLIENT_EMAIL,
      null,
      process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/drive"]
    );

    const drive = google.drive({ version: "v3", auth });

    const buffer = Buffer.from(base64Data, "base64");

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GDRIVE_FOLDER_ID],
      },
      media: {
        mimeType,
        body: buffer,
      },
      fields: "id, webViewLink",
    });

    res.status(200).json({ fileId: response.data.id, webViewLink: response.data.webViewLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
