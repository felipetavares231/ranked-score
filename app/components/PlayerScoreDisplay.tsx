"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { winrate } from "../utils/getWinrate";
import { useTheme } from "next-themes";

export const PlayerScoreDisplay = ({ data }: { data: any }) => {

  return (
    <Card className="border rounded-xl shadow-lg p-8">
      <CardContent className="flex flex-row items-center justify-around">
        <div className="flex flex-col text-center">
          <img
            src={Object.entries(data.playerSkins)[0][1]}
            className="w-20 h-20"
          />
          <span className="text-4xl font-extrabold text-gray-800 dark:text-white py-2 rounded-lg">
            {data.scores[Object.entries(data.playerSkins)[0][0]]}
          </span>
          <span className="text-1xl font-extrabold text-gray-500 dark:text-gray-300 py-2 rounded-lg">
            {winrate(data.scores[Object.entries(data.playerSkins)[0][0]], data.scores[Object.entries(data.playerSkins)[1][0]])}
          </span>
        </div>

        <div className="flex flex-col items-center text-gray-500 font-bold px-4">
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-500"></div>
          <span className="my-2 dark:text-white">VS</span>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-500"></div>
        </div>

        <div className="flex flex-col text-center">
          <img
            src={Object.entries(data.playerSkins)[1][1]}
            className="w-20 h-20 scale-x-[-1]"
          />
          <span className="text-4xl font-extrabold text-gray-800 dark:text-white py-2 rounded-lg">
            {data.scores[Object.entries(data.playerSkins)[1][0]]}
          </span>
          <span className="text-1xl font-extrabold text-gray-500 dark:text-gray-300 py-2 rounded-lg">
            {winrate(data.scores[Object.entries(data.playerSkins)[1][0]], data.scores[Object.entries(data.playerSkins)[0][0]])}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
