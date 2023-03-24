import { EAuthTokenPlatformType, LoginSession } from "steam-session";
import { writeRefreshToken } from "./utils/token.js";
import qrcode from "qrcode-terminal";
import { createLogger } from "./utils/logger.js";

const logger = createLogger("login");

const session = new LoginSession(EAuthTokenPlatformType.SteamClient);
session.loginTimeout = 120000;

const challenge = await session.startWithQR();

logger.info("Scan QR code with your steam mobile app");
qrcode.generate(challenge.qrChallengeUrl);

session.on("authenticated", async () => {
  writeRefreshToken(session.refreshToken);
  logger.info("Login successful, you can now run: npm run start");
});

session.on("timeout", () => {
  logger.error("This login attempt has timed out.");
});

session.on("error", (error) => {
  logger.error(`ERROR: This login attempt has failed! ${error.message}`);
});
