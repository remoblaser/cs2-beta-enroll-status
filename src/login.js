import { EAuthTokenPlatformType, LoginSession } from "steam-session";
import { writeRefreshToken } from "./utils/token.js";
import qrcode from "qrcode-terminal";

const session = new LoginSession(EAuthTokenPlatformType.SteamClient);
session.loginTimeout = 120000;

const challenge = await session.startWithQR();

console.log("Scan QR code with your steam mobile app");
qrcode.generate(challenge.qrChallengeUrl);

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
