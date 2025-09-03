export const getScores = (runnerOne: any, runnerTwo: any, scores: any): any => {

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

  return scores
}
