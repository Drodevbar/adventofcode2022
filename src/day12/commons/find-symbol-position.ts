export const findSymbolPosition = (rawMatrix: string[][], symbol: string): [number, number] => {
  for (let x = 0; x < rawMatrix.length; x++) {
    for (let y = 0; y < rawMatrix[x].length; y++) {
      if (rawMatrix[x][y] === symbol) {
        return [x, y];
      }
    }
  }

  throw new Error(`Symbol ${symbol} not found in given matrix`);
}
