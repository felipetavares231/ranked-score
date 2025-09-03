"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PlayerInputProps {
  setRunner: Dispatch<SetStateAction<string>>
  setRunner2: Dispatch<SetStateAction<string>>
  onClick: () => void
}

export const PlayerInput = ({ setRunner, setRunner2, onClick }: PlayerInputProps) => {
  return (
    <Card className="border border-gray-300 rounded-xl shadow-lg p-8 bg-white">
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="flex flex-row items-center space-x-4 text-center">
          <span>Compare</span>
          <Input placeholder="a player" className="w-36" onChange={(e) => setRunner(e.target.value)} />
          <span>to</span>
          <Input placeholder="another player" className="w-36" onChange={(e) => setRunner2(e.target.value)} />
        </div>
        <Button className="px-8" onClick={onClick}>
          Compare!
        </Button>
      </CardContent>
    </Card>
  )
}
