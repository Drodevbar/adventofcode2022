import { readInput } from "../../utils/read-input";

abstract class Instruction {
  protected cycles: number;
  protected value: number;

  public execute(): number {
    this.cycles -= 1;

    return this.cycles === 0 ? this.value : 0;
  }

  public getCycles(): number {
    return this.cycles;
  }
}

class Noop extends Instruction {
  protected cycles = 0;
  protected value = 0
}

class Addx extends Instruction {
  protected cycles = 2;

  constructor(value: number) {
    super();
    this.value = value;
  }
}

(async () => {
  const rawInput = await readInput("./src/day10/input.txt");
  const instructions = rawInput.map((line) => line.split(" "));

  const instructionsQueue: Instruction[] = [];
  instructions.forEach((instruction) => {
    if (instruction[0] === "noop") {
      instructionsQueue.push(new Noop());
      return;
    }

    const addxValue = parseInt(instruction[1], 10);
    instructionsQueue.push(new Addx(addxValue));
  });

  let registerXValue = 1;
  let sumOfSignalStrengths = 0;
  let currentInstruction: Instruction = new Noop();

  for (let cycleNumber = 1; cycleNumber <= 220; cycleNumber++) {
    if (currentInstruction.getCycles() <= 0 && instructionsQueue.length > 0) {
      currentInstruction = instructionsQueue.shift();
    }

    if ([20, 60, 100, 140, 180, 220].includes(cycleNumber)) {
      sumOfSignalStrengths += cycleNumber * registerXValue;
    }

    registerXValue += currentInstruction.execute();
  }

  console.log(sumOfSignalStrengths);
})();
