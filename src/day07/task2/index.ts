import { readInput } from "../../utils/read-input";
import { Directory } from "../directory";

const getDirectoriesSize = (sizes: number[], currentLevelDirectory: Directory) => {
  sizes.push(currentLevelDirectory.getOverallSize());

  currentLevelDirectory.getChildren().forEach((child) => {
    return getDirectoriesSize(sizes, child);
  });

  return sizes;
}

(async () => {
  const terminalLines = await readInput("./src/day07/input.txt");

  const topDirectory = new Directory("/");
  let currentDirectory = topDirectory;

  terminalLines.slice(1).forEach((line) => {
    const commandParts = line.split(" ");

    if (commandParts[0] === "$") {
      if (commandParts[1] === "cd" && commandParts[2] !== "..") {
        const child = new Directory(commandParts[2]);
        child.setParent(currentDirectory);
        currentDirectory.addChild(child);
        currentDirectory = child;
        return;
      }

      if (commandParts[1] === "cd" && commandParts[2] === "..") {
        currentDirectory = currentDirectory.getParent();
        return;
      }

      return;
    }

    if (commandParts[0] !== "dir") {
      const fileSize = parseInt(commandParts[0], 10);
      currentDirectory.increaseFilesSize(fileSize);

      return;
    }
  });

  const sizes = getDirectoriesSize([], topDirectory);
  const sizesSortedAsc = sizes.slice().sort((a, b) => a - b);
  const totalSize = sizesSortedAsc[sizesSortedAsc.length - 1];

  const answer = sizesSortedAsc.find((value) => 70_000_000 - totalSize + value >= 30_000_000);

  console.log(answer);
})();

