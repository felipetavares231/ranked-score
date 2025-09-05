export const getScoresFromVersusScores = (versusScores: any): any => {
  let scores: any = {}

  versusScores.map((season: any) => {
    const ranked = season.data.results.ranked

    const runnerOne = Object.entries(ranked)[1]
    const runnerTwo = Object.entries(ranked)[2]

    if (scores.hasOwnProperty(runnerOne[0])) {
      scores[runnerOne[0]] += runnerOne[1]
    } else {
      scores[runnerOne[0]] = runnerOne[1]
    }

    if (scores.hasOwnProperty(runnerTwo[0])) {
      scores[runnerTwo[0]] += runnerTwo[1]
    } else {
      scores[runnerTwo[0]] = runnerTwo[1]
    }
  })

  return scores
}
