import { readInput } from "../../utils/read-input";

const findFirstStartOfMessageMarker = (packetsArray: string[]) => {
  for (let i = 0; i <= packetsArray.length - 14; i++) {
    const fourCharacters = packetsArray.slice(i, i + 14);

    if (new Set(fourCharacters).size === 14) {
      return i + 14;
    }
  }

  throw new Error("There is no start of the message marker inside given packets");
}

(async () => {
  const rawInput = await readInput("./src/day06/input.txt");
  const packetsArray = rawInput[0].split("");

  const answer = findFirstStartOfMessageMarker(packetsArray);

  console.log(answer);
})();
