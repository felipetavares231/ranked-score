import { generateReferences } from "@/app/utils/generateReferences";
import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: {
  params: Promise<{
    runnerOne: string
    runnerTwo: string
  }>
}) {

  const { runnerOne, runnerTwo } = await params;

  const references = await generateReferences(runnerOne, runnerTwo);

  const versusMatches = await getVersusMatches(runnerOne, runnerTwo);

  return Response.json({
    references,
    versusMatches
  })
}
