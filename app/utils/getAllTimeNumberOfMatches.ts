
export const getAllTimeNumberOfMatches = (versusScores: any) => {
  let allTimeNumberOfMatches = 0;
  versusScores.map((season: any) => {
    const ranked = season.data.results.ranked

    const num = ranked.total
    allTimeNumberOfMatches += num
  })

  return allTimeNumberOfMatches;
}
