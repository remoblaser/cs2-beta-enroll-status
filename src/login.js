import { EAuthTokenPlatformType, LoginSession } from "steam-session";
import { writeRefreshToken } from "./utils/token.js";

const QR_CODE_SERVICE_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=";

const session = new LoginSession(EAuthTokenPlatformType.SteamClient);
session.loginTimeout = 120000;

const challenge = await session.startWithQR();

const qrUrl =
  QR_CODE_SERVICE_URL + encodeURIComponent(challenge.qrChallengeUrl);

console.log(`Open QR code: ${qrUrl}`);

session.on("authenticated", async () => {
  writeRefreshToken(session.refreshToken);
  console.log("Login successful");
});

session.on("timeout", () => {
  console.error("This login attempt has timed out.");
});

session.on("error", (err) => {
  console.error(`ERROR: This login attempt has failed! ${err.message}`);
});
