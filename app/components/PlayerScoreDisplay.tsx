"use client"
import { Card, CardContent } from "@/components/ui/card";
import { winrate } from "../utils/getWinrate";

interface PlayerScoreDisplayProps {
  data: any;
  overlay?: boolean;
  runnerOne: string;
  runnerTwo: string;
}

export const PlayerScoreDisplay = ({ data, overlay = false, runnerOne, runnerTwo }: PlayerScoreDisplayProps) => {
  const runnerUuid = data.references[runnerOne];
  const opponentUuid = data.references[runnerTwo];

  const runnerScore = data.scores[runnerUuid];
  const opponentScore = data.scores[opponentUuid];

  const runnerWins = runnerScore > opponentScore;
  const opponentWins = opponentScore > runnerScore;

  return (
    <Card className={`rounded-xl ${!overlay ? "border" : "bg-transparent border-none"}`}>
      <CardContent className="flex items-center justify-around p-8 gap-4">
        <div className="flex flex-col items-center gap-2">
          <img
            src={data.playerSkins[runnerUuid] as string}
            className="h-28 w-auto drop-shadow-lg"
            style={{ imageRendering: "pixelated" }}
            alt={runnerOne}
          />
          <span className="text-sm text-muted-foreground">{runnerOne}</span>
          <span className={`text-5xl tabular-nums ${runnerWins ? "text-emerald-500" : ""}`}>
            {runnerScore}
          </span>
          <span className="text-xs text-muted-foreground">
            {winrate(runnerScore, opponentScore)}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 px-4">
          <div className="w-px h-8 bg-border" />
          <span className="text-lg text-muted-foreground tracking-widest">VS</span>
          <div className="w-px h-8 bg-border" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            src={data.playerSkins[opponentUuid] as string}
            className="h-28 w-auto drop-shadow-lg scale-x-[-1]"
            style={{ imageRendering: "pixelated" }}
            alt={runnerTwo}
          />
          <span className="text-sm text-muted-foreground">{runnerTwo}</span>
          <span className={`text-5xl tabular-nums ${opponentWins ? "text-emerald-500" : ""}`}>
            {opponentScore}
          </span>
          <span className="text-xs text-muted-foreground">
            {winrate(opponentScore, runnerScore)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
