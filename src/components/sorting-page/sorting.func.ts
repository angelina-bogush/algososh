import { swapFunc } from "../../services/utils"

export const sortArray = () => {
    return
}

export const bubbleSort = (arr: number[], sort: "ascend" | "descend") => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (sort === "ascend") {
        if (arr[i] < arr[j]) {
          swapFunc(arr, i, j);
        }
      } else {
        if (arr[i] > arr[j]) {
          swapFunc(arr, i, j);
        }
      }
    }
  }
  return arr;
};
export const selectionSort = (arr: number[], sort: "ascend" | "descend") => {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (sort === "ascend") {
        if (arr[j] < arr[min]) {
          min = j;
        }
      } else {
        if (arr[j] > arr[min]) {
          min = j;
        }
      }
    }
    swapFunc(arr, i, min);
  }
  return arr;
};

export const randomArr = () => {
  let minLength = 3;
  let maxLength = 17;
  const arrLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const arr = [];
  for (let i = 0; i < arrLength; i++) {
    const randomNum = Math.ceil(Math.random() * 100);
    arr.push(randomNum);
  }
  return arr;
};