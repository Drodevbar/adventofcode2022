import { readInput } from "../../utils/read-input";

const findFirstStartOfPacketMarker = (packetsArray: string[]) => {
  for (let i = 0; i <= packetsArray.length - 4; i++) {
    const fourCharacters = packetsArray.slice(i, i + 4);

    if (new Set(fourCharacters).size === 4) {
      return i + 4;
    }
  }

  throw new Error("There is no start of the packet marker inside given packets");
}

(async () => {
  const rawInput = await readInput("./src/day06/input.txt");
  const packetsArray = rawInput[0].split("");

  const answer = findFirstStartOfPacketMarker(packetsArray);

  console.log(answer);
})();
