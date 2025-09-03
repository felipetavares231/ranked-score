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

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return (
    <div className="h-screen flex flex-wrap items-center justify-center flex-col">
      <PlayerInput setRunner={setRunner} setRunner2={setRunner2} onClick={handleCompare} />

      {data?.playerSkins && (
        <div className="mt-2">
          <PlayerScoreDisplay data={data} />
        </div>
      )}

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
                  <Card className="border border-gray-300 rounded-xl shadow-lg p-8 bg-white" key={`seasonScore-${index}`}>
                    <CardContent className="flex flex-row items-center">
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
                    </CardContent>
                  </Card>
                )
              }
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
