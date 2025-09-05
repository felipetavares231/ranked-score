import { getAllTimeNumberOfMatches } from "@/app/utils/getAllTimeNumberOfMatches";
import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { getVersusScores } from "@/app/utils/getVersusScores";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: {
  params: Promise<{
    runnerOne: string
    runnerTwo: string
  }>
}) {

  const { runnerOne, runnerTwo } = await params;

  const versusScores = await getVersusScores(runnerOne, runnerTwo);
  const allTimeNumberOfMatches = getAllTimeNumberOfMatches(versusScores)

  return Response.json({
    allTimeNumberOfMatches
  })
}
