// test.js
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load local env variables
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

async function test() {
  try {
    const auth = new google.auth.JWT(
      process.env.GDRIVE_CLIENT_EMAIL,
      null,
      process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/drive.readonly"]
    );

    const drive = google.drive({ version: "v3", auth });

    //const response = await drive.files.list({
    //  q: `'${process.env.GDRIVE_FOLDER_ID}' in parents and trashed=false`,
    //  fields: "files(id, name, webViewLink)",
    //});

    //console.log("Files:", response.data.files);
    const response = await drive.files.list({
        pageSize: 10,
        fields: "files(id, name)",
    });
    console.log("Files:", response.data.files);

  } catch (err) {
    console.error(err);
  }
}

async function testDrive() {
  const auth = new google.auth.JWT(
    process.env.GDRIVE_CLIENT_EMAIL,
    null,
    process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/drive"]
  );

  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    q: `'YOUR_FOLDER_ID' in parents`,
    fields: "files(id, name)",
  });

  console.log("Files visible:", res.data.files);
}

async function testDriveRoot() {
  const auth = new google.auth.JWT(
    process.env.GDRIVE_CLIENT_EMAIL,
    null,
    process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/drive"]
  );

  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    pageSize: 10,
    fields: "files(id, name, mimeType)",
  });

  console.log("Accessible files:", res.data.files);
}

testDriveRoot().catch(console.error);
