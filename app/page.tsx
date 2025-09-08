"use client"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { ThemeToggle } from "./components/ThemeToggle"
import { PlayerInput } from "./components/PlayerInput"
import { PlayerScoreDisplay } from "./components/PlayerScoreDisplay"
import { ScoresPerSeasonDisplay } from "./components/ScoresPerSeasonDisplay"

export default function Home() {
  const searchParams = useSearchParams()

  const [runner, setRunner] = useState("")
  const [runner2, setRunner2] = useState("")
  const [initialFetchDone, setInitialFetchDone] = useState(false)

  useEffect(() => {
    const r1 = searchParams.get("runnerOne")
    const r2 = searchParams.get("runnerTwo")

    if (r1) setRunner(r1)
    if (r2) setRunner2(r2)

    if (r1 && r2) setInitialFetchDone(true)
  }, [searchParams])

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["scores", runner, runner2],
    queryFn: async () => {
      const res = await fetch(`/api/getAllTimeStats/${runner}/${runner2}`)
      if (!res.ok) throw new Error("failed to fetch")
      return res.json()
    },
    enabled: false,
  })

  useEffect(() => {
    if (initialFetchDone) {
      refetch()
      setInitialFetchDone(false)
    }
  }, [initialFetchDone, refetch])

  const handleCompare = () => {
    refetch()
  }

  return (
    <div>
      <div className="mt-2 ml-2">
        <ThemeToggle />
      </div>
      <div className="h-screen flex justify-center flex-wrap">
        <div className="flex flex-col mr-16">
          <div className="mb-4">
            <PlayerInput
              setRunner={setRunner}
              setRunner2={setRunner2}
              onClick={handleCompare}
              isLoading={isLoading}
              runner={runner}
              runner2={runner2}
            />
          </div>
          {data?.playerSkins && (
            <PlayerScoreDisplay data={data} runnerOne={runner} runnerTwo={runner2} />
          )}
        </div>
        {data?.scoresPerSeason && (
          <ScoresPerSeasonDisplay data={data} runnerOne={runner} runnerTwo={runner2} />
        )}
      </div>
    </div>
  )
}
