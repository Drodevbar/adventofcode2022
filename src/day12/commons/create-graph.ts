export const createGraph = (rawMatrix: string[][]): number[][][][] => {
  const matrix = rawMatrix.slice().map(
    (row) => row.map((value) => {
      if (value === "S") {
        return "a";
      }
      if (value === "E") {
        return "z";
      }
      return value;
    })
  );
  const graph: number[][][][] = Array.from({ length: matrix.length })
    .map(() => Array.from({ length: matrix[0].length })
      .map(() => [])
    );


  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      const currentVertex = matrix[x][y].charCodeAt(0);

      if (x > 0 && matrix[x - 1][y].charCodeAt(0) <= currentVertex + 1) {
        graph[x][y].push([x - 1, y]);
      }

      if (y > 0 && matrix[x][y - 1].charCodeAt(0) <= currentVertex + 1) {
        graph[x][y].push([x, y - 1]);
      }

      if (x < matrix.length - 1 && matrix[x + 1][y].charCodeAt(0) <= currentVertex + 1) {
        graph[x][y].push([x + 1, y]);
      }

      if (y < matrix[x].length - 1 && matrix[x][y + 1].charCodeAt(0) <= currentVertex + 1) {
        graph[x][y].push([x, y + 1]);
      }

    }
  }

  return graph;
}
