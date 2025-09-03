import { getAllTimeNumberOfMatches } from "@/app/utils/getAllTimeNumberOfMatches";
import { getScores } from "@/app/utils/getScores";
import { getPlayerSkins } from "@/app/utils/playerSkins";
import { NextRequest } from "next/server";

interface getScoresInterface {
  params: {
    runnerOne: string;
    runnerTwo: string;
  }
}

interface leaderBoardData {
  season: {
    number: number
  }
}

export async function GET(req: NextRequest, { params }: getScoresInterface) {
  const { runnerOne, runnerTwo } = await params;

  const eloLeaderboard = await fetch(`https://mcsrranked.com/api/leaderboard`)
  const data: leaderBoardData = await eloLeaderboard.json();

  const seasonNumber = data.season?.number;
  if (seasonNumber) {
    throw new Error("season number not found")
  }

  let versusScores = []
  let versusMatches = []

  for (let i = 1; i <= 9; i++) {
    let res = await fetch(`https://mcsrranked.com/api/users/${runnerOne}/versus/${runnerTwo}?season=${i}&type=2`)
    versusScores.push(await res.json());

    res = await fetch(`https://mcsrranked.com/api/users/${runnerOne}/versus/${runnerTwo}/matches?season=${i}&type=2`)
    versusMatches.push(await res.json())
  }

  const allTimeMatches: any = []
  let allTimeNumberOfMatches = 0;

  let scores = {}
  versusScores.map((season) => {
    const ranked = season.data.results.ranked

    const run1 = Object.entries(ranked)[1]
    const run2 = Object.entries(ranked)[2]

    getScores(run1, run2, scores)

    allTimeMatches.push(ranked)
    const num = ranked.total
    allTimeNumberOfMatches += num
  })

  const playerSkins = getPlayerSkins(scores)

  //TODO: maybe filter allTimeMatches to exclude the ones where total == 0, instead of doing that on the client
  //TODO: maybe reverse the allTimeMatches so that it's from latest season to oldest
  return Response.json({
    playerSkins,
    scores,
    allTimeNumberOfMatches,
    allTimeMatches,
    versusMatches
  })
}
