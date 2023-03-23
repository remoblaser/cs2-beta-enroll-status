const SteamUser = require("steam-user");
const GlobalOffensive = require("globaloffensive");
const getRefreshToken = require("./src/get-refresh-token");

const client = new SteamUser();
const csgo = new GlobalOffensive(client);

getRefreshToken().then((refreshToken) => {
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

  client.on("receivedFromGC", (appid, msgType, payload) => {
    console.log(`[NOT IMPORTANT] ${appid}, ID: ${msgType}`);
    if (msgType == 9217) {
      console.log(
        `[!!!!!!!!!!!!!!!!!!!!!!!] ${userName} GOT CS2 BETA!!!!!!!`,
        true
      );
    }
  });

  csgo.on("disconnectedFromGC", (reason) => {
    console.log("Disconnected from CS:GO Game Coordinator. Reason:", reason);
  });
});
