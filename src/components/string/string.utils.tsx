import { TArray } from "./string";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../services/utils";
import { swapFunc } from "../../services/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const reverseArray = async (
    arr: TArray[] | [],
    setArray: React.Dispatch<React.SetStateAction<TArray[]>>
  ) => {
    const mid = Math.ceil(arr.length / 2);
    const newArr = [...arr];

    for (let i = 0; i < mid; i++) {
      let j = arr.length - 1 - i;
      newArr[i].color = newArr[j].color = ElementStates.Changing;
      setArray([...newArr]);
      await delay(DELAY_IN_MS);
      swapFunc(newArr, i, j);
      newArr[i].color = newArr[j].color = ElementStates.Modified;
      setArray([...newArr]);
    }
    return newArr
  };