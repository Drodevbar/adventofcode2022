export const bfs = (graph: number[][][][], start: [number, number], end: [number, number]): number | null => {
  const [startX, startY] = start;
  const [endX, endY] = end;

  const visited: boolean[][] = Array.from({ length: graph.length })
    .map(() => Array.from({ length: graph[0].length }).map(() => false));
  const distance: number[][] = Array.from({ length: graph.length })
    .map(() => Array.from({ length: graph[0].length }).map(() => 0));

  const queue: number[][] = [[startX, startY]];
  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [currX, currY] = queue.shift();

    if (currX === endX && currY === endY) {
      return distance[currX][currY];
    }

    graph[currX][currY].forEach(([neighborX, neighborY]) => {
      if (visited[neighborX][neighborY]) {
        return;
      }

      visited[neighborX][neighborY] = true;
      distance[neighborX][neighborY] = distance[currX][currY] + 1;
      queue.push([neighborX, neighborY]);
    });

  }

  return null
}
