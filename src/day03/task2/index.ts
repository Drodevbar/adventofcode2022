import { readInput } from "../../utils/read-input";
import { initializeItemsPriorityMap } from "../common";

const getRucksacksContentGrouped = (rucksacksContent: string[]): string[][] => {
  const grouped: string[][] = [];

  rucksacksContent.forEach((singleRucksackContent, index) => {
    if (index % 3 === 0) {
      grouped.push([]);
    }

    grouped[Math.floor(index / 3)].push(singleRucksackContent);
  });

  return grouped;
}

(async () => {
  const rucksacksContent = await readInput("./src/day03/input.txt");
  const rucksacksContentGrouped = getRucksacksContentGrouped(rucksacksContent);
  const itemsPriorityMap = initializeItemsPriorityMap();

  let sumOfPriorities = 0;
  rucksacksContentGrouped.forEach((singleRucksackContentGroup) => {
    const first = singleRucksackContentGroup[0].split("");
    const second = singleRucksackContentGroup[1].split("");
    const third = singleRucksackContentGroup[2].split("");

    const firstAndSecondDuplicatedItems = first.filter((item) => second.includes(item));
    const duplicatedItem = firstAndSecondDuplicatedItems.filter((item) => third.includes(item))[0];

    sumOfPriorities += itemsPriorityMap.get(duplicatedItem);
  })

  console.log(sumOfPriorities);
})();
