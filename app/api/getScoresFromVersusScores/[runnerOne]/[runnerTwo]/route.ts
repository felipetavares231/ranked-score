import { generateReferences } from "@/app/utils/generateReferences";
import { getScoresFromVersusScores } from "@/app/utils/getScores";
import { getScoresPerSeason } from "@/app/utils/getScoresPerSeason";
import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { getVersusScores } from "@/app/utils/getVersusScores";
import { isMinecraftUuid } from "@/app/utils/isMinecraftUuid";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: {
  params: Promise<{
    runnerOne: string
    runnerTwo: string
  }>
}) {
  const { runnerOne, runnerTwo } = await params;

  if (isMinecraftUuid(runnerOne) || isMinecraftUuid(runnerTwo)) {
    throw new Error("One of the given names are actually uuids")
  }

  const references = await generateReferences(runnerOne, runnerTwo);

  const versusScores = await getVersusScores(runnerOne, runnerTwo);
  const scores = getScoresFromVersusScores(versusScores)

  return Response.json({
    references,
    scores
  })
}
