export const getPlayerSkins = (hash: Record<string, any>): Record<string, string> => {
  const entries = Object.entries(hash);
  const playerSkins: Record<string, string> = {};

  if (entries[0]) {
    playerSkins[entries[0][0]] = `https://mc-heads.net/head/${entries[0][0]}`;
  }

  if (entries[1]) {
    playerSkins[entries[1][0]] = `https://mc-heads.net/head/${entries[1][0]}`;
  }

  return playerSkins;
};
