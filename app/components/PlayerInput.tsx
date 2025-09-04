"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PlayerInputProps {
  setRunner: Dispatch<SetStateAction<string>>
  setRunner2: Dispatch<SetStateAction<string>>
  onClick: () => void
  isLoading?: boolean
}

export const PlayerInput = ({ setRunner, setRunner2, onClick, isLoading }: PlayerInputProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timer

    if (isLoading) {
      setProgress(0)
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 5
          return next > 95 ? 95 : next
        })
      }, 200)
    } else {
      setProgress(100)
    }
    return () => clearInterval(interval)
  }, [isLoading])
  //TODO: move all of this progress bar logic into a separate component

  return (
    <Card className="border border-gray-300 rounded-xl shadow-lg p-8 bg-white">
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="flex flex-row items-center space-x-4 text-center">
          <span>Compare</span>
          <Input placeholder="a player" className="w-36" onChange={(e) => setRunner(e.target.value)} />
          <span>to</span>
          <Input placeholder="another player" className="w-36" onChange={(e) => setRunner2(e.target.value)} />
        </div>
        <Button className="px-8" onClick={onClick} disabled={isLoading}>
          Compare!
        </Button>
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
      </CardContent>
    </Card>
  )
}
