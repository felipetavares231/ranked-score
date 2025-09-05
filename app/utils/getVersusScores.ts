export const getVersusScores = async (runnerOne: string, runnerTwo: string) => {
  let versusScores: any = [];

  for (let i = 1; i <= 9; i++) {
    let res = await fetch(`https://mcsrranked.com/api/users/${runnerOne}/versus/${runnerTwo}?season=${i}&type=2`)
    versusScores.push(await res.json());
  }

  return versusScores;
}
