import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { NextRequest } from "next/server";


interface getVersusMatchesInterface {
  params: {
    runnerOne: string
    runnerTwo: string
  }
}

export async function GET(req: NextRequest, { params }: getVersusMatchesInterface) {

  const { runnerOne, runnerTwo } = await params;

  const versusMatches = await getVersusMatches(runnerOne, runnerTwo);

  return Response.json({
    versusMatches
  })
}
