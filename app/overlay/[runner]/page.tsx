"use client";

import { PlayerScoreDisplay } from "@/app/components/PlayerScoreDisplay";
import { getPlayerSkins } from "@/app/utils/playerSkins";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const OverlayPage = () => {
  const params = useParams();
  const runner = params?.runner as string;

  const [runnerName, setRunnerName] = useState("");
  const [opponentName, setOpponentName] = useState("");

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
      const res = await fetch(`/api/getScoresFromVersusScores/${runnerName}/${opponentName}`)
      if (!res.ok) {
        throw new Error("failed to fetch")
      }
      return res.json()
    },
    enabled: false,
  });

  useEffect(() => {
    if (!liveRankedResponse) return;

    const currentMatch = liveRankedResponse.data.liveMatches.find(
      (match: any) => match.players[0]?.nickname === runner || match.players[1]?.nickname === runner
    );

    if (!currentMatch) return;

    const player = currentMatch.players.find((p: any) => p.nickname === runner);
    const playerUuid = player?.uuid;
    const playerName = player?.nickname;
    setRunnerName(playerName);

    const opponentUuid = Object.entries(currentMatch?.data ?? {}).find(([uuid]) => uuid !== playerUuid)?.[0];
    if (!opponentUuid) return;

    setRunnerUuid(playerUuid);
    setOpponentUuid(opponentUuid);

    const fetchOpponentName = async () => {
      try {
        const res = await fetch(`/api/getMinecraftNameFromId/${opponentUuid}`);
        const data = await res.json();
        if (data.name) setOpponentName(data.name);
      } catch (err) {
        console.error("Failed to fetch opponent name:", err);
      }
    };

    fetchOpponentName();
  }, [liveRankedResponse]);

  useEffect(() => {
    if (runnerName && opponentName) {
      getRankedScores()
    }
  }, [runnerName, opponentName])

  useEffect(() => {
    if (rankedScoresResponse) {
      setDataToShow(
        {
          references: {
            [runnerName]: runnerUuid,
            [opponentName]: opponentUuid,
          },
          scores: rankedScoresResponse.scores,
          playerSkins: {
            [runnerUuid]: `https://mc-heads.net/head/${runnerName}`,
            [opponentUuid]: `https://mc-heads.net/head/${opponentName}`,
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
          <PlayerScoreDisplay overlay data={dataToShow} runnerOne={runnerName} runnerTwo={opponentName} />
        </div>
      )}
      <div className="flex flex-1"></div>
    </div>
  );
};

export default OverlayPage;
