import { getMinecraftId } from "./getMinecraftId";

export const generateReferences = async (runnerOne: string, runnerTwo: string) => {
  const runnerUuid = await getMinecraftId(runnerOne);
  const opponentUuid = await getMinecraftId(runnerTwo);

  let references = {
    [runnerOne]: runnerUuid,
    [runnerTwo]: opponentUuid
  }

  return references;
}
