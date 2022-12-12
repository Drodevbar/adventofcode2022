import { readInput } from "../../utils/read-input";
import { findSymbolPosition } from "../commons/find-symbol-position";
import { bfs } from "../commons/bfs";
import { createGraph } from "../commons/create-graph";

(async () => {
  const rawInput = await readInput("./src/day12/input.txt");
  const rawMatrix = rawInput.map((line) => line.split(""));
  const endPosition = findSymbolPosition(rawMatrix, "E");
  const graph = createGraph(rawMatrix);

  const startPositions: [number, number][] =  [findSymbolPosition(rawMatrix, "S")];

  for (let x = 0; x < rawMatrix.length; x++) {
    for (let y = 0; y < rawMatrix[x].length; y++) {
      if (rawMatrix[x][y] === "a") {
        startPositions.push([x, y]);
      }
    }
  }

  const distances = startPositions.map((startPosition) => bfs(graph, startPosition, endPosition));
  const distancesAsc = distances.slice().filter((distance) => distance !== null).sort((a, b) => a - b);

  const answer = distancesAsc[0];

  console.log(answer);
})();
