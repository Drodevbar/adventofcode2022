import { readInput } from "../../utils/read-input";

const isVisible = (x: number, y: number, matrix: string[][]): boolean => {
  if (x === 0 || x === matrix.length - 1 || y === 0 || y === matrix[x].length - 1) {
    return true;
  }

  const currentTreeHeight = matrix[x][y];

  let isRightVisible = true;
  for (let i = x + 1; i < matrix.length; i++) {
    if (matrix[i][y] >= currentTreeHeight) {
      isRightVisible = false;
      break;
    }
  }

  let isLeftVisible = true;
  for (let i = x - 1; i >= 0; i--) {
    if (matrix[i][y] >= currentTreeHeight) {
      isLeftVisible = false;
      break;
    }
  }

  let isTopVisible = true;
  for (let j = y + 1; j < matrix[x].length; j++) {
    if (matrix[x][j] >= currentTreeHeight) {
      isTopVisible = false;
      break;
    }
  }

  let isBottomVisible = true;
  for (let j = y - 1; j >= 0; j--) {
    if (matrix[x][j] >= currentTreeHeight) {
      isBottomVisible = false;
      break;
    }
  }

  return isRightVisible || isLeftVisible || isTopVisible || isBottomVisible;
}

(async () => {
  const rawInput = await readInput("./src/day08/input.txt");
  const treesMatrix = rawInput.map((row) => row.split(""));

  let countVisibleTrees = 0;

  for (let x = 0; x < treesMatrix.length; x++) {
    for (let y = 0; y < treesMatrix[x].length; y++) {
      countVisibleTrees += isVisible(x, y, treesMatrix) ? 1 : 0;
    }
  }

  console.log(countVisibleTrees);
})();
