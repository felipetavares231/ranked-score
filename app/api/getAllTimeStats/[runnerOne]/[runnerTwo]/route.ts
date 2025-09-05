import { getAllTimeNumberOfMatches } from "@/app/utils/getAllTimeNumberOfMatches";
import { getScoresFromVersusScores } from "@/app/utils/getScores";
import { getScoresPerSeason } from "@/app/utils/getScoresPerSeason";
import { getVersusMatches } from "@/app/utils/getVersusMatches";
import { getVersusScores } from "@/app/utils/getVersusScores";
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

  const versusMatches = await getVersusMatches(runnerOne, runnerTwo);
  const versusScores = await getVersusScores(runnerOne, runnerTwo);

  const scores = getScoresFromVersusScores(versusScores)
  const playerSkins = getPlayerSkins(scores)
  const allTimeNumberOfMatches = getAllTimeNumberOfMatches(versusScores)
  const scoresPerSeason = getScoresPerSeason(versusScores)

  //TODO: maybe filter allTimeMatches to exclude the ones where total == 0, instead of doing that on the client
  //TODO: maybe reverse the allTimeMatches so that it's from latest season to oldest
  return Response.json({
    playerSkins,
    scores,
    allTimeNumberOfMatches,
    scoresPerSeason,
    versusMatches
  })
}
