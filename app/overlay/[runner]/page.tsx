"use client";

import { PlayerScoreDisplay } from "@/app/components/PlayerScoreDisplay";
import { getPlayerSkins } from "@/app/utils/playerSkins";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OverlayPage = () => {
  const params = useParams();
  const runner = params?.runner as string;

  const [runnerUuid, setRunnerUuid] = useState("");
  const [opponentUuid, setOpponentUuid] = useState("");
  const [dataToShow, setDataToShow] = useState<any>(null);

  const { data: liveRankedResponse, refetch, isLoading } = useQuery({
    queryKey: ["liveRankedApi"],
    queryFn: async () => {
      const res = await fetch("https://mcsrranked.com/api/live/")
      if (!res.ok) {
        throw new Error("failed to fetch")
      }
      return res.json()
    },
    refetchInterval: 1000 * 60
  });

  const { data: rankedScoresResponse, refetch: getRankedScores } = useQuery({
    queryKey: ["getRankedScores"],
    queryFn: async () => {
      const res = await fetch(`/api/getScoresFromVersusScores/${runnerUuid}/${opponentUuid}`)
      if (!res.ok) {
        throw new Error("failed to fetch")
      }
      return res.json()
    },
    enabled: false,
  });

  useEffect(() => {
    if (liveRankedResponse) {
      let currentMatch = liveRankedResponse.data.liveMatches.find((match: any) => match.players[0]?.nickname == runner || match.players[1]?.nickname == runner)
      let playerUuid = currentMatch?.players.find((player: any) => player["nickname"] == runner).uuid
      let opponentUuid = Object.entries(currentMatch?.data ?? {}).find((player) => player[0] !== playerUuid)?.[0]

      setRunnerUuid(playerUuid)
      if (opponentUuid) {
        setOpponentUuid(opponentUuid)
      }
    }
  }, [liveRankedResponse])

  useEffect(() => {
    if (runnerUuid && opponentUuid) {
      getRankedScores()
    }
  }, [runnerUuid, opponentUuid])

  useEffect(() => {
    if (rankedScoresResponse) {
      setDataToShow(
        {
          scores: rankedScoresResponse.scores, playerSkins: {
            [runnerUuid]: `https://mc-heads.net/head/${runnerUuid}`,
            [opponentUuid]: `https://mc-heads.net/head/${opponentUuid}`,
          }
        }
      )
    }
  }, [rankedScoresResponse])

  return (
    //TODO: make the entire overlay transparent, class = `${!overlay ? 'bg-card' : ''}`
    //TODO: maybe add some description like "All Time Score Against Opponent on the bottom of the card"
    //TODO: show somewhere on the main page that you can make the overlay
    <div className="flex flex-1">
      {dataToShow && (
        <div className="flex flex-1">
          <PlayerScoreDisplay overlay data={dataToShow} />
        </div>
      )}
      <div className="flex flex-1"></div>
    </div>
  );
};

export default OverlayPage;
