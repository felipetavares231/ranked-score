"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export const PlayerScoreDisplay = ({ data }: { data: any }) => {
  return (
    <Card className="border border-gray-300 rounded-xl shadow-lg p-8 bg-white">
      <CardContent className="flex flex-row items-center">
        <div className="flex flex-col text-center">
          <img
            src={Object.entries(data.playerSkins)[0][1]}
            className="w-20 h-20"
          />
          <span className="text-4xl font-extrabold text-gray-800 py-2 rounded-lg">
            {data.scores[Object.entries(data.playerSkins)[0][0]]}
          </span>
        </div>

        <div className="flex flex-col items-center text-gray-500 font-bold px-4">
          <div className="w-px h-6 bg-gray-300"></div>
          <span className="my-2">VS</span>
          <div className="w-px h-6 bg-gray-300"></div>
        </div>

        <div className="flex flex-col text-center">
          <img
            src={Object.entries(data.playerSkins)[1][1]}
            className="w-20 h-20 scale-x-[-1]"
          />
          <span className="text-4xl font-extrabold text-gray-800 py-2 rounded-lg">
            {data.scores[Object.entries(data.playerSkins)[1][0]]}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
