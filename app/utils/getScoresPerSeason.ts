export const getScoresPerSeason = (versusScores: any) => {
  const scoresPerSeason: any = []

  versusScores.map((season: any) => {
    const ranked = season.data.results.ranked
    scoresPerSeason.push(ranked)
  })

  return scoresPerSeason;
}
