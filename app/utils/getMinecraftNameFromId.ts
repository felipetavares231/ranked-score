export const getMinecraftNameFromId = async (minecraftId: string) => {
  const res = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${minecraftId}`)
  if (!res.ok) {
    throw new Error("failed to fetch")
  }
  let data = await res.json();
  return data.name;
}
