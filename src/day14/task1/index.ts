import { readInput } from "../../utils/read-input";

(async () => {
  const height = 1000;
  const width = 1000;
  const input = await readInput("./src/day14/input.txt");
  const matrix: string[][] = Array.from({ length: width }).map(() => Array.from({ length: height }).map(() => "."));

  input.forEach((line) => {
    const coordsList = line.split("->");
    const lineCoords: [number, number][] = [];

    coordsList.forEach((coords) => {
      const [y, x] = coords.trim().split(",").map((value) => parseInt(value, 10));
      lineCoords.push([x, y]);
    });

    for (let i = 1; i < coordsList.length; i++) {
      const [currentX, currentY] = lineCoords[i - 1];
      const [nextX, nextY] = lineCoords[i];

      for (let x = Math.min(currentX, nextX); x <= Math.max(currentX, nextX); x++) {
        for (let y = Math.min(currentY, nextY); y <= Math.max(currentY, nextY); y++) {
          matrix[x][y] = "#";
        }
      }
    }
  });

  const startingCoords = [0, 500];
  matrix[startingCoords[0]][startingCoords[1]] = "+";
  let [currentX, currentY] = startingCoords;
  let canContinue = true;
  let snowCounter = 0;

  while (canContinue) {
    if (currentX === matrix.length - 1 || currentY === matrix[currentX].length - 1) {
      canContinue = false;
      continue;
    }

    if (matrix[currentX + 1][currentY] === ".") {
      currentX += 1;
    } else if (matrix[currentX + 1][currentY - 1] === ".") {
      currentX += 1;
      currentY -= 1;
    } else if (matrix[currentX + 1][currentY + 1] === ".") {
      currentX += 1;
      currentY += 1;
    } else if (matrix[currentX][currentY] === "."){
      snowCounter += 1;
      matrix[currentX][currentY] = "o";
      [currentX, currentY] = startingCoords;
    } else {
      canContinue = false;
    }
  }

  console.log(snowCounter);
})();
