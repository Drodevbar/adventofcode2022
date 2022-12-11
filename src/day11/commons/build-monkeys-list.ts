import { Monkey } from "./monkey";

export const buildMonkeysList = (rawInput: string[]) => {
  const monkeys: Monkey[] = [];
  let currentMonkey = null;

  rawInput.forEach((line) => {
    if (line.includes("Monkey")) {
      currentMonkey = new Monkey();
      monkeys.push(currentMonkey);
    }

    if (line.includes("Starting items")) {
      const regex = /[0-9]+/g
      const match = line.match(regex);
      const startingItems = match.map((value) => parseInt(value, 10));
      currentMonkey.itemsQueue.push(...startingItems);
      return;
    }

    if (line.includes("Operation")) {
      const regex = /new = old ([+|*]) ([0-9|old]+)/;
      const match = line.match(regex);
      currentMonkey.setOperationOperator(match[1]);
      currentMonkey.setOperationSecondValue(match[2]);
      return;
    }

    if (line.includes("Test: divisible")) {
      const regex = /[0-9]+/;
      const match = line.match(regex);
      const divider = parseInt(match[0], 10);
      currentMonkey.setDivider(divider);
      return;
    }

    if (line.includes("If true")) {
      const regex = /[0-9]+/;
      const match = line.match(regex);
      const monkeyTrueIndex = parseInt(match[0], 10);
      currentMonkey.setMonkeyIndexTrue(monkeyTrueIndex);
      return;
    }

    if (line.includes("If false")) {
      const regex = /[0-9]+/;
      const match = line.match(regex);
      const monkeyFalseIndex = parseInt(match[0], 10);
      currentMonkey.setMonkeyIndexFalse(monkeyFalseIndex);
      return;
    }
  });

  return monkeys;
}
