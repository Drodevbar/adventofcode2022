import { readInput } from "../../utils/read-input";
import { initializeStacks } from "../common";

type InstructionEntry = {
  fromIndex: number;
  toIndex: number;
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

      const entries = Array.from({ length: howMany }).map((): InstructionEntry => ({ fromIndex, toIndex }));
      instructionEntries.push(...entries);
    }
  });

  return instructionEntries;
}

(async () => {
  const rawInput = await readInput("./src/day05/input.txt");
  const stacks = initializeStacks(rawInput);
  const instructions = initializeInstructions(rawInput);

  instructions.forEach(({ fromIndex, toIndex }) => {
    if (stacks[fromIndex].peek() !== undefined) {
      stacks[toIndex].push(stacks[fromIndex].pop());
    }
  });

  const topLettersFromStacks = stacks.map((singleStack) => singleStack.peek());
  const answer = topLettersFromStacks.join("");

  console.log(answer);
})();
