import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { getVersusScores } from "@/app/utils/getVersusScores";
import { NextRequest } from "next/server";


interface getVersusMatchesInterface {
  params: {
    runnerOne: string
    runnerTwo: string
  }
}

export async function GET(req: NextRequest, { params }: getVersusMatchesInterface) {

  const { runnerOne, runnerTwo } = await params;

  const versusScores = await getVersusScores(runnerOne, runnerTwo);

  return Response.json({
    versusScores
  })
}
