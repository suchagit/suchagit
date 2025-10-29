import { google } from "googleapis";
import { redirect } from "react-router-dom";
import readline from "readline";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Only load dotenv if running locally and .env.local exists
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const redirectUri =
  process.env.NODE_ENV === "production"
    ? "https://boydandrejoice.vercel.app/api/oauth2callback"
    : "http://localhost:3000/oauth2callback";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("1️⃣ Visit this URL in your browser to authorize the app:\n", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("2️⃣ Enter the code from that page here: ", async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("\n✅ Refresh Token:", tokens.refresh_token);
  rl.close();
});
