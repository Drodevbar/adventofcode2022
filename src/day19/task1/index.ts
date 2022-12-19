import { readInput } from "../../utils/read-input";
import { initializeBlueprints, Materials, mostGeodes, Robots } from "../common";

(async () => {
  const timerStart = Date.now();
  const input = await readInput("./src/day19/input.txt");
  const blueprints = initializeBlueprints(input);

  let sumOfQualityLevels = 0;

  blueprints.forEach((blueprint) => {
    const robots: Robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 };
    const materials: Materials = { ore: 0, clay: 0, obsidian: 0, geode: 0 };

    const qualityLevel = mostGeodes(robots, materials, blueprint, 24) * blueprint.index;
    sumOfQualityLevels += qualityLevel;
  });

  console.log(sumOfQualityLevels);

  const timerStop = Date.now();
  console.log(`[Execution time: ${timerStop - timerStart}ms]`);
})()
