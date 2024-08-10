#!/usr/env/bin node

const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * list threads
 * @param {*} auth
 */
async function listThreads(auth, nextPageToken) {
  const gmail = google.gmail({ version: "v1", auth });

  console.log("try to list threads...");
  const res = await gmail.users.threads.list(
    Object.assign(
      {
        q: "category:forums",
        maxResults: 100,
        userId: "me",
      },
      nextPageToken ? { pageToken: nextPageToken } : {}
    )
  );

  if (res.data.threads) {
    console.log("save to thread list file...");
    await fs.writeFile(
      path.join(process.cwd(), `thread-${nextPageToken || 0}.txt`),
      [res.data.threads.map((thread) => String(thread.id))].join("\n")
    );
  }

  if (res.data.nextPageToken) {
    console.log("nextPageToken founded.");

    // tail call optimization
    return await listThreads(auth, res.data.nextPageToken);
  }
}

authorize().then(listThreads).catch(console.error);
