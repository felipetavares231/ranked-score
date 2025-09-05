"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { formatTime } from "../utils/formatTime";

interface ScoresPerSeasonDisplayProps {
  data: any
}

export const ScoresPerSeasonDisplay = ({ data }: ScoresPerSeasonDisplayProps) => {

  return (
    <Card className="border rounded-xl shadow-lg p-8 mb-8">
      <CardContent className="flex flex-col items-center">
        <span className="text-4xl font-extrabold py-2 rounded-lg">
          Scores Per Season
        </span>
        {[...data.scoresPerSeason].reverse().map((seasonScore, index, arrRef) => {
          if (seasonScore.total == 0) {
            return null
          } else {
            return (
              //TODO: make a button to collapse/uncollapse all
              <Collapsible key={`seasonScore-${index}`} className="mb-4 flex flex-grow flex-col">
                <div className="flex flex-col">
                  <div>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg mr-4">
                      {`S${data.scoresPerSeason.length - index}: `}
                    </span>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg">
                      {seasonScore[Object.entries(data.playerSkins)[0][0]]}
                    </span>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg">
                      {" - "}
                    </span>
                    <span className="text-4xl font-extrabold text-gray-800 dark:text-gray-300 py-2 rounded-lg">
                      {seasonScore[Object.entries(data.playerSkins)[1][0]]}
                    </span>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" />
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
                      const winner = match.players.find((element: any) => element.uuid === match.result.uuid)?.nickname
                      const eloChange = match.changes.find((element: any) => element.uuid === match.result.uuid)?.change
                      return (
                        //TODO: go to ranked stats page to show the match stats
                        <div
                          key={match.id}
                          className="grid grid-cols-3 gap-4 py-2 border-b text-center text-gray-800 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className="font-semibold">{winner}</span>
                          <span className={`${eloChange && eloChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600"}`}>
                            {eloChange > 0 ? `+${eloChange}` : eloChange}
                          </span>
                          <span>{formatTime(match.result.time)}</span>
                        </div>
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
