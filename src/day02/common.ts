export enum SHAPE {
  ROCK, PAPER, SCISSORS,
}

export enum OUTCOME {
  LOST, DRAW, WON,
}

const shapeScore = new Map<SHAPE, number>([
  [SHAPE.ROCK, 1],
  [SHAPE.PAPER, 2],
  [SHAPE.SCISSORS, 3],
]);

const outcomeScore = new Map<OUTCOME, number>([
  [OUTCOME.LOST, 0],
  [OUTCOME.DRAW, 3],
  [OUTCOME.WON, 6],
]);

const getOutcome = (opponentShape: SHAPE, playerShape: SHAPE): OUTCOME => {
  if (
    playerShape === SHAPE.ROCK && opponentShape === SHAPE.SCISSORS ||
    playerShape === SHAPE.PAPER && opponentShape === SHAPE.ROCK ||
    playerShape === SHAPE.SCISSORS && opponentShape === SHAPE.PAPER
  ) {
    return OUTCOME.WON;
  }

  if (playerShape === opponentShape) {
    return OUTCOME.DRAW;
  }

  return OUTCOME.LOST;
}

export const getRoundPoints = (opponentShape: SHAPE, playerShape: SHAPE) => {
  const outcome = getOutcome(opponentShape, playerShape);

  return outcomeScore.get(outcome) + shapeScore.get(playerShape);
}

export const mapRawShapeToEnum = (value: string): SHAPE => {
  switch (value) {
    case "A":
    case "X":
      return SHAPE.ROCK;
    case "B":
    case "Y":
      return SHAPE.PAPER;
    case "C":
    case "Z":
      return SHAPE.SCISSORS;
    default:
      throw new Error("Unknown shape provided");
  }
}
