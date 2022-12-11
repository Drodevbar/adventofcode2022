import { readInput } from "../../utils/read-input";

const getScenicScore = (x: number, y: number, matrix: string[][]): number => {
  if (x === 0 || x === matrix.length - 1 || y === 0 || y === matrix[x].length - 1) {
    return 0;
  }

  const currentTreeHeight = matrix[x][y];

  let maxRightTreesVisible = 0;
  for (let i = x + 1; i < matrix.length; i++) {
    maxRightTreesVisible++;

    if (matrix[i][y] >= currentTreeHeight) {
      break;
    }
  }

  let maxLeftTreesVisible = 0;
  for (let i = x - 1; i >= 0; i--) {
    maxLeftTreesVisible++;

    if (matrix[i][y] >= currentTreeHeight) {
      break;
    }
  }

  let maxTopTreesVisible = 0;
  for (let j = y + 1; j < matrix[x].length; j++) {
    maxTopTreesVisible++;

    if (matrix[x][j] >= currentTreeHeight) {
      break;
    }
  }

  let maxBottomTreesVisible = 0;
  for (let j = y - 1; j >= 0; j--) {
    maxBottomTreesVisible++;

    if (matrix[x][j] >= currentTreeHeight) {
      break;
    }
  }

  return maxRightTreesVisible * maxLeftTreesVisible * maxTopTreesVisible * maxBottomTreesVisible;
}

(async () => {
  const rawInput = await readInput("./src/day08/input.txt");
  const treesMatrix = rawInput.map((row) => row.split(""));

  let maxScenicScore = 0;

  for (let x = 0; x < treesMatrix.length; x++) {
    for (let y = 0; y < treesMatrix[x].length; y++) {
      maxScenicScore = Math.max(maxScenicScore, getScenicScore(x, y, treesMatrix));
    }
  }

  console.log(maxScenicScore);
})();
