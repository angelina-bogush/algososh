interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getStack: () => T[];
}

export class Stack<T> implements IStack<T> {
  public container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  peak = (): T => {
    return this.container[this.container.length - 1];
  };
  clear = (): void => {
    this.container = [];
  };
  getStack = () => this.container;
}
