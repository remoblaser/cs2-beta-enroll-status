import { readFileSync, writeFileSync } from "fs";

export const writeRefreshToken = (refreshToken) => {
  writeFileSync("./temp/token.json", JSON.stringify({ refreshToken }));
};

export const readRefreshToken = () => {
  try {
    const tokenRaw = readFileSync("./temp/token.json");
    const token = JSON.parse(tokenRaw);
    return token.refreshToken;
  } catch (err) {
    return null;
  }
};
