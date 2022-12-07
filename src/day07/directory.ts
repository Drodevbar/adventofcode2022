export class Directory {
  private readonly children: Directory[] = [];
  private parent: Directory = null;
  private filesSize: number = 0;

  constructor(public readonly name: string) {}

  addChild(child: Directory) {
    this.children.push(child);
  }

  getChildren() {
    return this.children;
  }

  setParent(parent: Directory) {
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  increaseFilesSize(value: number) {
    this.filesSize += value;
  }

  getOverallSize() {
    let overallSize = this.filesSize;

    this.children.forEach((child) => {
      overallSize += child.getOverallSize();
    });

    return overallSize;
  }
}
