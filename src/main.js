import SteamUser from "steam-user";
import GlobalOffensive from "globaloffensive";
import { readRefreshToken } from "./utils/token.js";
import { createLogger } from "./utils/logger.js";

const BETA_ENROLL_MESSAGE_TYPE = 9217;
const THIRTY_MINUTES = 900000 * 2;

const logger = createLogger("main");

const client = new SteamUser();
const csgo = new GlobalOffensive(client);

const refreshToken = readRefreshToken();

if (!refreshToken) {
  logger.error("No refresh token found. Please run `npm run login` first.");
  process.exit();
}

client.logOn({
  refreshToken,
});

setInterval(() => {
  logger.info("Restarting CS:GO game coordinator");
  client.relog();
}, THIRTY_MINUTES);

client.on("loggedOn", () => {
  logger.info("Logged into Steam successfully.");
  logger.info("This script will automatically relog every 30 minutes.");
  client.setPersona(SteamUser.EPersonaState.Online);
  client.gamesPlayed([730]);
});

client.on("error", (error) => {
  logger.error(`An error occurred: ${error.message}`);
});

csgo.on("connectedToGC", () => {
  logger.info("Connected to CS:GO game coordinator.");
});

client.on("receivedFromGC", (appid, messageType) => {
  logger.info(`Received: ${appid}, ID: ${messageType}`);
  if (messageType == BETA_ENROLL_MESSAGE_TYPE) {
    logger.warn(`${userName} RECEIVED BETA INVITE!`);
  }
});

csgo.on("disconnectedFromGC", (reason) => {
  logger.warn(`Disconnected from CS:GO Game Coordinator. Reason: ${reason}`);
});
