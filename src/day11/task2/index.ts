import { readInput } from "../../utils/read-input";
import { buildMonkeysList } from "../commons/build-monkeys-list";

(async () => {
  const rawInput = await readInput("./src/day11/input.txt");
  const monkeysList = buildMonkeysList(rawInput);

  const inspectionsCount: number[] = Array.from({ length: monkeysList.length }).map(() => 0);
  const modulo = monkeysList
    .map((monkey) => monkey.getDivider())
    .reduce((dividerA, dividerB) => dividerA * dividerB, 1);

  for (let i = 0; i < 10_000; i++) {
    monkeysList.forEach((monkey, index) => {
      inspectionsCount[index] += monkey.itemsQueue.length;

      while(monkey.itemsQueue.length > 0) {
        const { newValue, throwToMonkeyIndex } = monkey.test();
        monkeysList[throwToMonkeyIndex].itemsQueue.push(newValue % modulo);
      }
    });
  }

  const inspectionsCountDesc = inspectionsCount.slice().sort((a, b) => b - a);
  const monkeyBusiness = inspectionsCountDesc[0] * inspectionsCountDesc[1];

  console.log(monkeyBusiness);
})();
