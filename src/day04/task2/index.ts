import { readInput } from "../../utils/read-input";

class AssignmentsSection {
  constructor(
    private readonly startIndex: number,
    private readonly stopIndex: number,
  ) {}

  overlaps(other: AssignmentsSection): boolean {
    return this.startIndex <= other.stopIndex && this.stopIndex >= other.stopIndex;
  }
}

const getListOfAssignmentsSectionPairs = (rawInput: string[]): AssignmentsSection[][] => {
  const pairs: AssignmentsSection[][] = [];

  rawInput.forEach((pairAssignments, index) => {
    pairs.push([]);
    const assignmentsArray = pairAssignments.split(",");

    assignmentsArray.forEach((assignments) => {
      const [start, stop] = assignments.split("-");
      const startIndex = parseInt(start, 10);
      const stopIndex = parseInt(stop, 10);

      pairs[index].push(new AssignmentsSection(startIndex, stopIndex));
    });
  });

  return pairs;
}

(async () => {
  const rawInput = await readInput("./src/day04/input.txt");
  const listOfAssignmentsSectionPairs = getListOfAssignmentsSectionPairs(rawInput);

  const answer = listOfAssignmentsSectionPairs.filter(
    (pair) => pair[0].overlaps(pair[1]) || pair[1].overlaps(pair[0])
  ).length;

  console.log(answer);
})();
