import { Stack } from "./data-structures/stack";

export const getNumberOfStacks = (rawInput: string[]) => {
  const lineWithNumberOfStacks = rawInput.find((_line, index) => rawInput[index + 1] === "");
  const lastDigit = lineWithNumberOfStacks.split(" ").filter((value) => value !== "").pop();

  return parseInt(lastDigit, 10);
}

export const initializeStacks = (rawInput: string[]): Stack<string>[] => {
  const numberOfStacks = getNumberOfStacks(rawInput);
  const stacks = Array.from({ length: numberOfStacks }).map(() => new Stack<string>());
  const regexp = /[A-Z]+/g;

  rawInput.slice().reverse().forEach((line) => {
    const matches = line.matchAll(regexp);

    for (const match of matches) {
      const currentStackIndex = Math.floor((match.index - 1) / 4);
      stacks[currentStackIndex].push(match[0]);
    }
  });

  return stacks;
}
