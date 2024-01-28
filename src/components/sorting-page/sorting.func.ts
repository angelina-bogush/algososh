import { swapFunc } from "../../services/utils"
import { delay } from "../../services/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Dispatch, SetStateAction } from "react";
import { TArray } from "./sorting-page";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";


export const bubbleSort = async (
  arr: TArray[],
  sort: Direction,
  setArray: Dispatch<SetStateAction<TArray[]>>
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      if (arr[j + 1]) arr[j + 1].color = ElementStates.Changing;
      setArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);

      if (sort === Direction.Ascending) {
        if (arr[j].value > arr[j + 1].value) {
          swapFunc(arr, j, j + 1);
        }
      } else {
        if (arr[j].value < arr[j + 1].value) {
          swapFunc(arr, j, j + 1);
        }
      }
      arr[j].color = ElementStates.Default;
      if (arr[j + 1]) arr[j + 1].color = ElementStates.Default;
      setArray([...arr]);
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
    setArray([...arr]);
  }
};

export const selectionSort = async (
  arr: TArray[],
  sort: Direction,
  setArray: Dispatch<SetStateAction<TArray[]>>
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArray([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (sort === Direction.Ascending) {
        if (arr[j].value < arr[min].value) {
          min = j;
        }
      } else {
        if (arr[j].value > arr[min].value) {
          min = j;
        }
      }
      arr[j].color = ElementStates.Default;
      setArray([...arr]);
    }
    swapFunc(arr, i, min);
    arr[i].color = ElementStates.Modified;
    setArray([...arr]);
  }
  arr[arr.length - 1].color = ElementStates.Modified;
    setArray([...arr]);
};

export const randomNum = (min: number, max: number) => {
  return  Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomArr = () => {
  let minLength = 3;
  let maxLength = 17;
  const arrLength = randomNum(minLength, maxLength)
  const arr = [];
  for (let i = 0; i < arrLength; i++) {
    const randomNum = Math.ceil(Math.random() * 100);
    arr.push(randomNum);
  }
  const obj = arr.map((num) => {
    return {
      value: num,
      color: ElementStates.Default,
    };
  });
  return obj;
};