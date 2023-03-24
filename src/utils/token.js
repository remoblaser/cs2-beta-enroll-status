import { readFileSync, writeFileSync } from "fs";

const getFileName = (user) => {
  return user ? `./temp/token-${user}.json` : "./temp/token.json";
}

export const writeRefreshToken = (refreshToken, user = null) => {
  writeFileSync(getFileName(user), JSON.stringify({ refreshToken }));
};

export const readRefreshToken = (user = null) => {
  try {
    const tokenRaw = readFileSync(getFileName(user));
    const token = JSON.parse(tokenRaw);
    return token.refreshToken;
  } catch (err) {
    return null;
  }
};
