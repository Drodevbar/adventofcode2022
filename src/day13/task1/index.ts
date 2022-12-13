import { readInput } from "../../utils/read-input";
import { chunkArray } from "../common/utils/chunk-array";
import { MatchResult, Packets, packetsMatch } from "../common/packets-match";

(async () => {
  const input = (await readInput("./src/day13/input.txt"))
    .filter((line) => line !== "")
    .map((line) => JSON.parse(line));
  const packetsPairs = chunkArray<[Packets, Packets]>(input, 2)

  const indicesOfPairsMatching: number[] = [];

  packetsPairs.forEach((pair, index) => {
    if (packetsMatch(pair[0], pair[1]) === MatchResult.MATCH) {
      indicesOfPairsMatching.push(index + 1);
    }
  });

  const answer = indicesOfPairsMatching.reduce((a, b) => a + b, 0);

  console.log(answer);
})();
