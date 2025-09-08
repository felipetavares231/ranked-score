"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { formatTime } from "../utils/formatTime";
import Link from "next/link";
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
    const allOpen = openStates.some(open => !open);
    setOpenStates(Array(numSeasons).fill(allOpen));
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
    <Card className="border rounded-xl shadow-lg p-8 mb-8">
      <CardContent className="flex flex-col items-center">
        <span className="text-4xl font-extrabold py-2 rounded-lg">
          Scores Per Season
        </span>
        <Tooltip delayDuration={80}>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleAll}
              className="mb-2 mt-4"
            >
              {openStates.every(Boolean) ? (
                <ChevronRight className="h-5 w-5 transition-transform duration-200" />
              ) : (
                <ChevronDown className="h-5 w-5 transition-transform duration-200" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{openStates.every(Boolean) ? "Collapse All" : "Expand All"}</p>
          </TooltipContent>
        </Tooltip>
        {[...data.scoresPerSeason].reverse().map((seasonScore, index) => {
          if (seasonScore.total == 0) {
            return null
          } else {
            return (
              <Collapsible key={`seasonScore-${index}`} className="mb-4 flex flex-grow flex-col" open={openStates[index]}>
                <div className="flex flex-col">
                  <div>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg mr-4">
                      {`S${data.scoresPerSeason.length - index}: `}
                    </span>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg">
                      {seasonScore[runnerUuid]}
                    </span>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg">
                      {" - "}
                    </span>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg">
                      {seasonScore[opponentUuid]}
                    </span>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => toggleOne(index)}>
                        {openStates[index] ?
                          <ChevronDown className="h-5 w-5 transition-transform duration-200" /> :
                          <ChevronRight className="h-5 w-5 transition-transform duration-200" />
                        }
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="flex flex-col space-y-2">
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 text-lg font-bold text-gray-700 dark:text-gray-500">
                      <span>Winner</span>
                      <span>Elo Change</span>
                      <span>Time</span>
                    </div>
                    {[...data.versusMatches].reverse().at(index)?.data.map((match: any) => {
                      return (
                        <SeasonScore key={match.id} match={match} />
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          }
        })}
      </CardContent>
    </Card>
  )
}
