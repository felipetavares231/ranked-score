"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";
import { SeasonScore } from "./SeasonScore";

interface ScoresPerSeasonDisplayProps {
  data: any;
  runnerOne: string;
  runnerTwo: string;
}

export const ScoresPerSeasonDisplay = ({ data, runnerOne, runnerTwo }: ScoresPerSeasonDisplayProps) => {
  const numSeasons = data.scoresPerSeason.length;

  const [openStates, setOpenStates] = useState<boolean[]>(Array(numSeasons).fill(false));

  const toggleAll = () => {
    const allOpen = openStates.every(Boolean);
    setOpenStates(Array(numSeasons).fill(!allOpen));
  };

  const toggleOne = (index: number) => {
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const runnerUuid = data.references[runnerOne];
  const opponentUuid = data.references[runnerTwo];

  return (
    <Card className="border rounded-xl">
      <CardContent className="flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl tracking-wide">Scores Per Season</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAll}
          >
            {openStates.every(Boolean) ? (
              <ChevronsDownUp className="h-4 w-4" />
            ) : (
              <ChevronsUpDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-1">
          {[...data.scoresPerSeason].reverse().map((seasonScore, index) => {
            if (seasonScore.total === 0) return null;

            const seasonNum = data.scoresPerSeason.length - index;
            const p1Score = seasonScore[runnerUuid] ?? 0;
            const p2Score = seasonScore[opponentUuid] ?? 0;

            return (
              <Collapsible
                key={`season-${seasonNum}`}
                open={openStates[index]}
                onOpenChange={() => toggleOne(index)}
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground text-sm w-8">S{seasonNum}</span>
                      <span className="text-lg tabular-nums">
                        {p1Score}
                        <span className="text-muted-foreground mx-2">-</span>
                        {p2Score}
                      </span>
                    </div>
                    {openStates[index] ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                    )}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-1 ml-4 border-l-2 border-border pl-4">
                    <div className="grid grid-cols-3 gap-4 px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
                      <span>Winner</span>
                      <span>Elo</span>
                      <span>Time</span>
                    </div>
                    {[...data.versusMatches].reverse().at(index)?.data.map((match: any) => (
                      <SeasonScore key={match.id} match={match} />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
