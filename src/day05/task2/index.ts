import { readInput } from "../../utils/read-input";
import { initializeStacks } from "../common";
import { Stack } from "../data-structures/stack";

type InstructionEntry = {
  fromIndex: number;
  toIndex: number;
  howMany: number;
}

const initializeInstructions = (rawInput: string[]): InstructionEntry[] => {
  const regexp = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/g;
  const instructionEntries: InstructionEntry[] = [];

  rawInput.forEach((line) => {
    const matches = line.matchAll(regexp);

    for (const match of matches) {
      const howMany = parseInt(match[1], 10);
      const fromIndex = parseInt(match[2], 10) - 1;
      const toIndex = parseInt(match[3], 10) - 1;

      instructionEntries.push({ howMany, fromIndex, toIndex });
    }
  });

  return instructionEntries;
}

(async () => {
  const rawInput = await readInput("./src/day05/input.txt");
  const stacks = initializeStacks(rawInput);
  const instructions = initializeInstructions(rawInput);

  instructions.forEach(({ howMany, fromIndex, toIndex }) => {
    const temporaryStack = new Stack<string>();

    for (let i = 0; i < howMany; i++) {
      if (stacks[fromIndex].peek() !== undefined) {
        temporaryStack.push(stacks[fromIndex].pop());
      }
    }

    while (temporaryStack.size() > 0) {
      stacks[toIndex].push(temporaryStack.pop());
    }
  });

  const topLettersFromStacks = stacks.map((singleStack) => singleStack.peek());
  const answer = topLettersFromStacks.join("");

  console.log(answer);
})();
