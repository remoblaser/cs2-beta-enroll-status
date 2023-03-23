import SteamUser from "steam-user";
import GlobalOffensive from "globaloffensive";
import { readRefreshToken } from "./utils/token.js";

const BETA_ENROLL_MESSAGE_TYPE = 9217;

const client = new SteamUser();
const csgo = new GlobalOffensive(client);

const refreshToken = readRefreshToken();

if (!refreshToken) {
  console.error("No refresh token found. Please run `npm run login` first.");
  process.exit();
}

client.logOn({
  refreshToken,
});

client.on("loggedOn", () => {
  console.log("Logged into Steam successfully.");
  client.setPersona(SteamUser.EPersonaState.Online);
  client.gamesPlayed([730]);
});

client.on("error", (err) => {
  console.error("An error occurred:", err);
});

csgo.on("connectedToGC", () => {
  console.log("Connected to CS:GO Game Coordinator.");
});

client.on("receivedFromGC", (appid, messageType) => {
  console.log(`[message] ${appid}, ID: ${messageType}`);
  if (messageType == BETA_ENROLL_MESSAGE_TYPE) {
    console.warn(`[message] ${userName} RECEIVED BETA INVITE`);
  }
});

csgo.on("disconnectedFromGC", (reason) => {
  console.error("Disconnected from CS:GO Game Coordinator. Reason:", reason);
});
