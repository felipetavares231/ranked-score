export const getMinecraftId = async (playerName: string) => {
  const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${playerName}`)
  if (!res.ok) {
    throw new Error("failed to fetch")
  }
  let data = await res.json();
  return data.id;
}
