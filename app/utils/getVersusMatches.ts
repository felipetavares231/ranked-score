export const getVersusMatches = async (runnerOne: string, runnerTwo: string) => {
  let versusMatches: any = []

  for (let i = 1; i <= 9; i++) {
    let res = await fetch(`https://mcsrranked.com/api/users/${runnerOne}/versus/${runnerTwo}/matches?season=${i}&type=2`)
    versusMatches.push(await res.json())
  }

  return versusMatches;
}
