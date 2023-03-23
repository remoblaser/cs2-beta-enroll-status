const { readFileSync, writeFileSync } = require("fs");
const { EAuthTokenPlatformType, LoginSession } = require("steam-session");

const session = new LoginSession(EAuthTokenPlatformType.SteamClient);
session.loginTimeout = 1200000;

const readRefreshToken = () => {
  const rawToken = readFileSync("token.json");
  const token = JSON.parse(rawToken);
  return token.refreshToken;
};

const writeRefreshToken = (refreshToken) => {
  writeFileSync(
    "token.json",
    JSON.stringify({ refreshToken: session.refreshToken })
  );
};

const getRefreshToken = () =>
  new Promise(async (resolve, reject) => {
    try {
      const refreshToken = readRefreshToken();
      resolve(refreshToken);
    } catch (e) {
      let startResult = await session.startWithQR();
      const qrUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
        encodeURIComponent(startResult.qrChallengeUrl);
      console.log(`Open QR code: ${qrUrl}`);

      session.on("authenticated", async () => {
        writeRefreshToken();
        console.log("Login successful");
        resolve(session.refreshToken);
      });

      session.on("timeout", () => {
        console.log("This login attempt has timed out.");
        reject();
      });

      session.on("error", (err) => {
        console.log(`ERROR: This login attempt has failed! ${err.message}`);
        reject(err);
      });
    }
  });

module.exports = getRefreshToken;
