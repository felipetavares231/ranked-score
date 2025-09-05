import { getAllTimeNumberOfMatches } from "@/app/utils/getAllTimeNumberOfMatches";
import { getScoresPerSeason } from "@/app/utils/getScoresPerSeason";
import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { getVersusScores } from "@/app/utils/getVersusScores";
import { NextRequest } from "next/server";


interface getScoresPerSeasonInterface {
  params: {
    runnerOne: string
    runnerTwo: string
  }
}

export async function GET(req: NextRequest, { params }: getScoresPerSeasonInterface) {

  const { runnerOne, runnerTwo } = await params;

  const versusScores = await getVersusScores(runnerOne, runnerTwo);
  const scoresPerSeason = getScoresPerSeason(versusScores)

  return Response.json({
    scoresPerSeason
  })
}
