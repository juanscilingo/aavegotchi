export const calculateBRS = traits => {
  let score = 0;

  for (const trait of traits) {
    const number = parseInt(trait);
    score += number >= 50 ? number + 1 : 100 - number;
  }

  return score;
}