import { readInput } from "../../utils/read-input";
import { initializeBlueprints, Materials, mostGeodes, Robots } from "../common";

(async () => {
  const timerStart = Date.now();
  const input = await readInput("./src/day19/input.txt");
  const blueprints = initializeBlueprints(input);

  let answer = 1;

  for (let i = 0; i < 3; i++) {
    const robots: Robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 };
    const materials: Materials = { ore: 0, clay: 0, obsidian: 0, geode: 0 };

    answer *= mostGeodes(robots, materials, blueprints[i], 32);
  }

  console.log(answer);

  const timerStop = Date.now();
  console.log(`[Execution time: ${timerStop - timerStart}ms]`);
})()
