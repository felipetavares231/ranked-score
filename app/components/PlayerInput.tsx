"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Swords } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PlayerInputProps {
  runner: string;
  runner2: string;
  setRunner: Dispatch<SetStateAction<string>>
  setRunner2: Dispatch<SetStateAction<string>>
  onClick: () => void
  isLoading?: boolean
}

export const PlayerInput = ({ setRunner, setRunner2, onClick, isLoading, runner, runner2 }: PlayerInputProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: number | undefined

    if (isLoading) {
      setProgress(0)
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.random() * 5
          return next > 95 ? 95 : next
        })
      }, 200)
    } else {
      setProgress(100)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isLoading])

  return (
    <Card className="border rounded-xl">
      <CardContent className="flex flex-col items-center gap-5 p-6">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="text-sm text-muted-foreground">Compare</span>
          <Input
            placeholder="Player one"
            className="w-40 text-center"
            value={runner}
            onChange={(e) => setRunner(e.target.value)}
          />
          <span className="text-sm text-muted-foreground">vs</span>
          <Input
            placeholder="Player two"
            className="w-40 text-center"
            value={runner2}
            onChange={(e) => setRunner2(e.target.value)}
          />
        </div>
        <Button
          className="px-8 gap-2"
          onClick={onClick}
          disabled={isLoading || !runner || !runner2}
        >
          <Swords className="h-4 w-4" />
          Compare
        </Button>
        {isLoading && (
          <Progress value={progress} className="w-full" />
        )}
      </CardContent>
    </Card>
  )
}
