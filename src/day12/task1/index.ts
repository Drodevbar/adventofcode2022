import { readInput } from "../../utils/read-input";
import { findSymbolPosition } from "../commons/find-symbol-position";
import { bfs } from "../commons/bfs";
import { createGraph } from "../commons/create-graph";

(async () => {
  const rawInput = await readInput("./src/day12/input.txt");
  const rawMatrix = rawInput.map((line) => line.split(""));
  const startPosition = findSymbolPosition(rawMatrix, "S");
  const endPosition = findSymbolPosition(rawMatrix, "E");
  const graph = createGraph(rawMatrix);

  const answer = bfs(graph, startPosition, endPosition);

  console.log(answer);
})();
