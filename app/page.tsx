"use client";
import { useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ThemeToggle } from "./components/ThemeToggle";
import { PlayerInput } from "./components/PlayerInput";
import { PlayerScoreDisplay } from "./components/PlayerScoreDisplay";
import { ScoresPerSeasonDisplay } from "./components/ScoresPerSeasonDisplay";

function HomeContent() {
  const searchParams = useSearchParams();

  const [runner, setRunner] = useState("");
  const [runner2, setRunner2] = useState("");
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    const r1 = searchParams.get("runnerOne");
    const r2 = searchParams.get("runnerTwo");

    if (r1) setRunner(r1);
    if (r2) setRunner2(r2);

    if (r1 && r2) setInitialFetchDone(true);
  }, [searchParams]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["scores", runner, runner2],
    queryFn: async () => {
      const res = await fetch(`/api/getAllTimeStats/${runner}/${runner2}`);
      if (!res.ok) throw new Error("failed to fetch");
      return res.json();
    },
    enabled: false,
  });

  useEffect(() => {
    if (initialFetchDone) {
      refetch();
      setInitialFetchDone(false);
    }
  }, [initialFetchDone, refetch]);

  const handleCompare = () => {
    refetch();
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <header className="w-full max-w-2xl flex items-center justify-between mb-10">
        <h1 className="text-2xl tracking-widest uppercase font-bold">
          Ranked Score
        </h1>
        <ThemeToggle />
      </header>

      <main className="w-full max-w-2xl flex flex-col gap-6">
        <PlayerInput
          setRunner={setRunner}
          setRunner2={setRunner2}
          onClick={handleCompare}
          isLoading={isLoading}
          runner={runner}
          runner2={runner2}
        />
        {data?.playerSkins && (
          <PlayerScoreDisplay
            data={data}
            runnerOne={runner}
            runnerTwo={runner2}
          />
        )}
        {data?.scoresPerSeason && (
          <ScoresPerSeasonDisplay
            data={data}
            runnerOne={runner}
            runnerTwo={runner2}
          />
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-lg tracking-wide">
          Loading...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
