import { readInput } from "../../utils/read-input";
import { getRoundPoints, mapRawShapeToEnum, SHAPE } from "../common";

const toStrategyGuideEntry = (rawEntry: string): [SHAPE, SHAPE] => {
  const shapes = rawEntry.split(" ");

  return [mapRawShapeToEnum(shapes[0]), mapRawShapeToEnum(shapes[1])];
}

(async () => {
  const inputRaw = await readInput("./src/day02/input.txt");
  const strategyGuide = inputRaw.map((value) => toStrategyGuideEntry(value));

  const scoreList = strategyGuide.map((strategy) => getRoundPoints(strategy[0], strategy[1]));
  const answer = scoreList.reduce((a, b) => a + b, 0);

  console.log(answer);
})();
