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
import { ScoresPerSeasonDisplay } from "./components/ScoresPerSeasonDisplay";

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
    <div className="h-screen flex justify-center flex-wrap">
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
        <ScoresPerSeasonDisplay data={data} />
      )
      }
    </div>
  );
}
