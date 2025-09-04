export function winrate(scoreA: number, scoreB: number): string {
  const total = scoreA + scoreB
  if (total === 0) return "0%"
  const rate = (scoreA / total) * 100
  return `${Math.round(rate)}%`
}
