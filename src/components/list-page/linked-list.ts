import { ElementStates } from "../../types/element-states";
export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
}
export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  public size: number;
  private array(items: T[]) {
    items.forEach((value) => this.append(value));
  }
  constructor(items: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (items.length !== 0) this.array(items);
  }
  deleteHead() {
    if (this.head === null) {
      return;
    } else if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    } else {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteTail() {
    if (this.head === null) {
      return;
    }
    if (this.head.next === null) {
      this.head = null;
      this.tail = null;
      this.size--;
      return;
    }
    let curr = this.head;
    while (curr.next != null && curr.next.next != null) {
      curr = curr.next;
    }
    curr.next = null;
    this.size--;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        // перебрать элементы в списке до нужной позиции
        while (currIndex < index - 1) {
          currIndex++;
          if (curr) {
            curr = curr.next;
          }
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }

      this.size++;
    }
  }
  append(element: T) {
    const node = new Node(element);

    if (this.head === null || this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);

    node.next = this.head;
    this.head = node;
    this.size++;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      let curr = this.head;
      let prev = null;
      let currIndex = 0;
      while (currIndex < index && curr) {
        currIndex++;
        prev = curr;
        curr = curr.next;
      }
      if (curr) {
        if (prev === null) {
          this.head = curr.next;
        } else {
          prev.next = curr.next;
        }
      }
      this.size--;
    }
  }
  getByIndex(index: number) {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
      return null;
    } else {
      let curr = this.head;
      let currIndex = 0;
      while (currIndex < index) {
        if (curr) {
          currIndex++;
          curr = curr.next;
        }
      }

      return curr?.value;
    }
  }

  makeArray() {
    let curr = this.head;
    const res = [];

    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }

    return [...res].map((item) => ({
      value: item,
      color: ElementStates.Default,
    }));
  }
}
