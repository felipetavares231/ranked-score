import { getScoresFromVersusScores } from "@/app/utils/getScores";
import { getScoresPerSeason } from "@/app/utils/getScoresPerSeason";
import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { getVersusScores } from "@/app/utils/getVersusScores";
import { NextRequest } from "next/server";


interface getScoresInterface {
  params: {
    runnerOne: string
    runnerTwo: string
  }
}

export async function GET(req: NextRequest, { params }: getScoresInterface) {
  const { runnerOne, runnerTwo } = await params;

  const versusScores = await getVersusScores(runnerOne, runnerTwo);
  const scores = getScoresFromVersusScores(versusScores)

  return Response.json({
    scores
  })
}
