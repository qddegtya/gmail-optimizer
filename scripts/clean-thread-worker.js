#!/usr/env/bin node

const path = require("node:path");
const fsp = require("fs").promises;
const process = require("process");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

// singleton
let auth;

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
    const content = await fsp.readFile(TOKEN_PATH);
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
  const content = await fsp.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fsp.writeFile(TOKEN_PATH, payload);
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
 * delete thread
 * @param {*} auth
 */
module.exports = async ({ threadId }) => {
  // We ensure `auth` singleton
  // under multi worker
  if (!auth) {
    auth = await authorize();
  }

  // gmail
  const gmail = google.gmail({ version: "v1", auth });

  console.log(`try to delete ${threadId} ...`);
  try {
    const res = await gmail.users.threads.delete({
      id: threadId,
      userId: "me",
    });
    console.log(`${threadId} delete status: ${res.status}`);
  } catch (error) {
    console.log(`${threadId} delete fails`);
  }

  return threadId;
};
