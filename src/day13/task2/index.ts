import { readInput } from "../../utils/read-input";
import { MatchResult, Packets, packetsMatch } from "../common/packets-match";

(async () => {
  const packets = (await readInput("./src/day13/input.txt"))
    .filter((line) => line !== "")
    .map((line): Packets => JSON.parse(line));

  const dividerPacket1 = [[2]];
  const dividerPacket2 = [[6]];
  packets.push(dividerPacket1, dividerPacket2);

  const packetsSortedAsc = packets.slice().sort((a, b) => {
    const result = packetsMatch(a, b);

    if (result === MatchResult.MATCH) {
      return -1;
    }

    return result === MatchResult.CONTINUE_CHECKING ? 0 : 1;
  });

  const dividerPacket1Index = packetsSortedAsc.findIndex((current) => current === dividerPacket1) + 1;
  const dividerPacket2Index = packetsSortedAsc.findIndex((current) => current === dividerPacket2) + 1;

  const answer = dividerPacket1Index * dividerPacket2Index;

  console.log(answer);
})();
