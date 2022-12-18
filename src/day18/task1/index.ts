import { readInput } from "../../utils/read-input";

(async () => {
  const rawInput = await readInput("./src/day18/input.txt");
  const cubesCoords = rawInput.map(
    (line) => line
      .split(",")
      .map((value) => parseInt(value, 10))
  ) as [number, number, number][];

  const maxX = cubesCoords.map((el) => el[0]).sort((a, b) => b - a)[0];
  const maxY = cubesCoords.map((el) => el[1]).sort((a, b) => b - a)[0];
  const maxZ = cubesCoords.map((el) => el[2]).sort((a, b) => b - a)[0];

  const matrix: boolean[][][] = Array.from({ length: maxX + 1 })
    .map(
      () => Array.from({ length: maxY + 1 })
        .map(() => Array.from({ length: maxZ + 1 })
          .map(() => false),
        ),
    );

  cubesCoords.forEach(([x, y, z]) => matrix[x][y][z] = true);

  let surfaceArea = 0;

  cubesCoords.forEach(([x, y, z]) => {
    if (z - 1 < 0 || !matrix[x][y][z - 1]) {
      surfaceArea += 1;
    }

    if (z + 1 >= matrix[x][y].length || !matrix[x][y][z + 1]) {
      surfaceArea += 1;
    }

    if (y - 1 < 0 || !matrix[x][y - 1][z]) {
      surfaceArea += 1;
    }

    if (y + 1 >= matrix[x].length || !matrix[x][y + 1][z]) {
      surfaceArea += 1;
    }

    if (x - 1 < 0 || !matrix[x - 1][y][z]) {
      surfaceArea += 1;
    }

    if (x + 1 >= matrix.length || !matrix[x + 1][y][z]) {
      surfaceArea += 1;
    }
  });

  console.log(surfaceArea);
})()
