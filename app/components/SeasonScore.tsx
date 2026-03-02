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
      href={`https://mcsrranked.com/stats/${match.players[0].nickname}/vs/${match.players[1].nickname}/${match.id}?season=${match.season}`}
      target="_blank"
      className="grid grid-cols-3 gap-4 px-3 py-2 rounded-md text-sm hover:bg-accent/50 transition-colors"
    >
      <span>{winner}</span>
      <span className={eloChange > 0 ? "text-emerald-500" : "text-red-500"}>
        {eloChange > 0 ? `+${eloChange}` : eloChange}
      </span>
      <span className="text-muted-foreground">{formatTime(match.result.time)}</span>
    </Link>
  )
}
