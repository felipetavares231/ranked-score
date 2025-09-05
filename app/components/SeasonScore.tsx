import Link from "next/link"
import { formatTime } from "../utils/formatTime"

interface SeasonScoreProps {
  match: any
}

export const SeasonScore = ({ match }: SeasonScoreProps) => {
  const winner = match.players.find((element: any) => element.uuid === match.result.uuid)?.nickname
  const eloChange = match.changes.find((element: any) => element.uuid === match.result.uuid)?.change

  return (
    <Link
      href={`https://mcsrranked.com/stats/${match.players[0].nickname}/vs/${match.players[1].nickname}/${match.id}`}
      target="_blank"
      key={match.id}
      className="grid grid-cols-3 gap-4 py-2 border-b text-center text-gray-800 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span className="font-semibold">{winner}</span>
      <span className={`${eloChange && eloChange > 0 ? "text-green-600 dark:text-green-400" : "text-red-600"}`}>
        {eloChange > 0 ? `+${eloChange}` : eloChange}
      </span>
      <span>{formatTime(match.result.time)}</span>
    </Link>
  )
}
