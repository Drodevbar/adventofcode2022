import { readInput } from "../../utils/read-input";

(async () => {
  const rawInput = await readInput("./src/day18/input.txt");
  const cubesCoords = rawInput.map(
    (line) => line
      .split(",")
      .map((value) => parseInt(value, 10) + 1)
  ) as [number, number, number][];

  const maxX = cubesCoords.map((el) => el[0]).sort((a, b) => b - a)[0];
  const maxY = cubesCoords.map((el) => el[1]).sort((a, b) => b - a)[0];
  const maxZ = cubesCoords.map((el) => el[2]).sort((a, b) => b - a)[0];

  const matrix: boolean[][][] = Array.from({ length: maxX + 2 })
    .map(
      () => Array.from({ length: maxY + 2 })
        .map(() => Array.from({ length: maxZ + 2 })
          .map(() => false),
        ),
    );

  const visited = JSON.parse(JSON.stringify(matrix));
  visited[0][0][0] = true;
  const externalCoords: [number, number, number][] = [];
  const queue: [number, number, number][] = [[0, 0, 0]];

  cubesCoords.forEach(([x, y, z]) => matrix[x][y][z] = true);

  while (queue.length > 0) {
    const [x, y, z] = queue.shift();

    if (z - 1 >= 0 && !visited[x][y][z - 1]) {
      visited[x][y][z - 1] = true;

      if (matrix[x][y][z - 1]) {
        externalCoords.push([x, y, z - 1]);
      } else {
        queue.push([x, y, z - 1]);
      }
    }

    if (z + 1 < matrix[x][y].length && !visited[x][y][z + 1]) {
      visited[x][y][z + 1] = true;

      if (matrix[x][y][z + 1]) {
        externalCoords.push([x, y, z + 1]);
      } else {
        queue.push([x, y, z + 1]);
      }
    }

    if (y - 1 >= 0 && !visited[x][y - 1][z]) {
      visited[x][y - 1][z] = true;

      if (matrix[x][y - 1][z]) {
        externalCoords.push([x, y - 1, z]);
      } else {
        queue.push([x, y - 1, z]);
      }
    }

    if (y + 1 < matrix[x].length && !visited[x][y + 1][z]) {
      visited[x][y + 1][z] = true;

      if (matrix[x][y + 1][z]) {
        externalCoords.push([x, y + 1, z]);
      } else {
        queue.push([x, y + 1, z]);
      }
    }

    if (x - 1 >= 0 && !visited[x - 1][y][z]) {
      visited[x - 1][y][z] = true;

      if (matrix[x - 1][y][z]) {
        externalCoords.push([x - 1, y, z]);
      } else {
        queue.push([x - 1, y, z]);
      }
    }

    if (x + 1 < matrix.length && !visited[x + 1][y][z]) {
      visited[x + 1][y][z] = true;

      if (matrix[x + 1][y][z]) {
        externalCoords.push([x + 1, y, z]);
      } else {
        queue.push([x + 1, y, z]);
      }
    }
  }

  let externalSurfaceArea = 0;

  externalCoords.forEach(([x, y, z]) => {
    if (!matrix[x][y][z - 1] && visited[x][y][z - 1]) {
      externalSurfaceArea += 1;
    }

    if (!matrix[x][y][z + 1] && visited[x][y][z + 1]) {
      externalSurfaceArea += 1;
    }

    if (!matrix[x][y - 1][z] && visited[x][y - 1][z]) {
      externalSurfaceArea += 1;
    }

    if (!matrix[x][y + 1][z] && visited[x][y + 1][z]) {
      externalSurfaceArea += 1;
    }

    if (!matrix[x - 1][y][z] && visited[x - 1][y][z]) {
      externalSurfaceArea += 1;
    }

    if (!matrix[x + 1][y][z] && visited[x + 1][y][z]) {
      externalSurfaceArea += 1;
    }
  });

  console.log(externalSurfaceArea);
})()
