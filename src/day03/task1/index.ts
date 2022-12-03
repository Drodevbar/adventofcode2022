import { readInput } from "../../utils/read-input";
import { initializeItemsPriorityMap } from "../common";

(async () => {
  const rucksacksContent = await readInput("./src/day03/input.txt");
  const itemsPriorityMap = initializeItemsPriorityMap();

  let sumOfPriorities = 0;
  rucksacksContent.forEach((singleRucksackContent) => {
    const halfPosition = (singleRucksackContent.length / 2);
    const firstCompartment = singleRucksackContent.slice(0, halfPosition).split("");
    const secondCompartment = singleRucksackContent.slice(halfPosition).split("");

    const duplicatedItem = firstCompartment.filter((item) => secondCompartment.includes(item))[0];

    sumOfPriorities += itemsPriorityMap.get(duplicatedItem);
  })

  console.log(sumOfPriorities);
})();
