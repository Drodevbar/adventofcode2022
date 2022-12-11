export interface TestResult {
  newValue: number;
  throwToMonkeyIndex: number;
}

export class Monkey {
  public readonly itemsQueue: number[] = [];

  private divider: number;
  private monkeyIndexTrue: number;
  private monkeyIndexFalse: number;
  private operationOperator: string;
  private operationSecondValue: string;

  setDivider(divider: number) {
    this.divider = divider;
  }

  getDivider() {
    return this.divider;
  }

  setMonkeyIndexTrue(monkeyIndexTrue: number) {
    this.monkeyIndexTrue = monkeyIndexTrue;
  }

  setMonkeyIndexFalse(monkeyIndexFalse: number) {
    this.monkeyIndexFalse = monkeyIndexFalse;
  }

  setOperationOperator(operationOperator: string) {
    this.operationOperator = operationOperator;
  }

  setOperationSecondValue(operationSecondValue: string) {
    this.operationSecondValue = operationSecondValue;
  }

  private operation(old: number) {
    if (this.operationSecondValue === "old") {
      return this.operationOperator === "+"
        ? old + old
        : old * old;
    }

    return this.operationOperator === "+"
      ? old + parseInt(this.operationSecondValue, 10)
      : old * parseInt(this.operationSecondValue, 10);
  }

  test(divideWorryLevelBy: number = 1): TestResult {
    if (this.itemsQueue.length === 0) {
      throw new Error("No more items in items queue");
    }

    const currentItem = this.itemsQueue.shift();
    const newValue = Math.floor(this.operation(currentItem) / divideWorryLevelBy);
    const throwToMonkeyIndex = newValue % this.divider === 0 ? this.monkeyIndexTrue : this.monkeyIndexFalse;

    return { newValue, throwToMonkeyIndex };
  }
}
