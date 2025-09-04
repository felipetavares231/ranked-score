"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sampleData } from "./sampleData";
import { PlayerScoreDisplay } from "./components/PlayerScoreDisplay";
import { PlayerInput } from "./components/PlayerInput";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { formatTime } from "./utils/formatTime";
import { winrate } from "./utils/getWinrate";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

export default function Home() {
  const [runner, setRunner] = useState("");
  const [runner2, setRunner2] = useState("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["scores", runner, runner2],
    queryFn: async () => {
      const res = await fetch(`/api/getScores/${runner}/${runner2}`)
      if (!res.ok) {
        throw new Error("failed to fetch")
      }
      return res.json()
    },
    enabled: false,
  });

  const handleCompare = () => {
    refetch()
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col mr-16">
        <div className="mb-4">
          <PlayerInput setRunner={setRunner} setRunner2={setRunner2} onClick={handleCompare} isLoading={isLoading} />
        </div>
        {data?.playerSkins && (
          <div>
            <PlayerScoreDisplay data={data} />
          </div>
        )}
      </div>
      {data && data.allTimeMatches && (
        <Card className="border border-gray-300 rounded-xl shadow-lg p-8 bg-white">
          <CardContent className="flex flex-col items-center">
            <span className="text-4xl font-extrabold py-2 rounded-lg">
              Scores Per Season
            </span>
            {[...data.allTimeMatches].reverse().map((seasonScore, index, arrRef) => {
              if (seasonScore.total == 0) {
                return null
              } else {
                return (
                  //TODO: make a button to collapse/uncollapse all
                  <Collapsible key={`seasonScore-${index}`} className="mb-4">
                    <div className="flex flex-col">
                      <div>
                        <span className="text-4xl font-extrabold text-gray-800 py-2 rounded-lg mr-4">
                          {`S${data.allTimeMatches.length - index}: `}
                        </span>
                        <span className="text-4xl font-extrabold text-gray-800 py-2 rounded-lg">
                          {seasonScore[Object.entries(data.playerSkins)[0][0]]}
                        </span>
                        <span className="text-4xl font-extrabold text-gray-800 py-2 rounded-lg">
                          {" - "}
                        </span>
                        <span className="text-4xl font-extrabold text-gray-800 py-2 rounded-lg">
                          {seasonScore[Object.entries(data.playerSkins)[1][0]]}
                        </span>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-5 w-5 transition-transform duration-200 data-[state=open]:rotate-180" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                    <CollapsibleContent className="flex flex-col">
                      <div className="overflow-x-auto">
                        <div className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 text-lg font-bold text-gray-700">
                          <span>Winner</span>
                          <span>Elo Change</span>
                          <span>Time</span>
                        </div>
                        {[...data.versusMatches].reverse().at(index)?.data.map((match) => {
                          const winner = match.players.find((element) => element.uuid === match.result.uuid)?.nickname
                          const eloChange = match.changes.find((element) => element.uuid === match.result.uuid)?.change

                          return (
                            <div
                              key={match.id}
                              className="grid grid-cols-3 gap-4 py-2 border-b text-center text-gray-800"
                            >
                              <span className="font-semibold">{winner}</span>
                              <span className={`${eloChange && eloChange > 0 ? "text-green-600" : "text-red-600"}`}>
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
    </div >
  );
}
