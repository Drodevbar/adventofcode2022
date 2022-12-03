import { readInput } from "../../utils/read-input";
import { getRoundPoints, mapRawShapeToEnum, OUTCOME, SHAPE } from "../common";

const mapRawSuggestedOutcomeToEnum = (value: string): OUTCOME => {
  switch (value) {
    case "X":
      return OUTCOME.LOST;
    case "Y":
      return OUTCOME.DRAW;
    case "Z":
      return OUTCOME.WON;
    default:
      throw new Error("Unknown suggested outcome provided");
  }
}

const getSuggestedShape = (opponentShape: SHAPE, suggestedOutcome: OUTCOME): SHAPE => {
  if (suggestedOutcome === OUTCOME.DRAW) {
    return opponentShape;
  }

  if (suggestedOutcome === OUTCOME.WON) {
    switch (opponentShape) {
      case SHAPE.ROCK:
        return SHAPE.PAPER;
      case SHAPE.PAPER:
        return SHAPE.SCISSORS;
      case SHAPE.SCISSORS:
        return SHAPE.ROCK;
    }
  }

  switch (opponentShape) {
    case SHAPE.ROCK:
      return SHAPE.SCISSORS;
    case SHAPE.PAPER:
      return SHAPE.ROCK;
    case SHAPE.SCISSORS:
      return SHAPE.PAPER;
  }

  throw new Error("Wrong combination of opponent shape and suggested outcome provided");
}

const toStrategyGuideEntry = (rawEntry: string): [SHAPE, SHAPE] => {
  const shapeAndOutcome = rawEntry.split(" ");
  const opponentShape = mapRawShapeToEnum(shapeAndOutcome[0]);
  const playerSuggestedOutcome = mapRawSuggestedOutcomeToEnum(shapeAndOutcome[1]);
  const playerShape = getSuggestedShape(opponentShape, playerSuggestedOutcome);

  return [opponentShape, playerShape];
}

(async () => {
  const inputRaw = await readInput("./src/day02/input.txt");
  const strategyGuide = inputRaw.map((value) => toStrategyGuideEntry(value));

  const scoreList = strategyGuide.map((strategy) => getRoundPoints(strategy[0], strategy[1]));
  const answer = scoreList.reduce((a, b) => a + b, 0);

  console.log(answer);
})();
