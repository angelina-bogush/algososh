import { TListCircle } from "./list-page";
import { delay } from "../../services/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TButtonName = "addToHead" | "addToTail" | "addAtIndex" | "deleteAtIndex" | "deleteTail" | "deleteHead"

export const Buttons = {
  addToHead: "addToHead",
  addToTail: "addToTail",
  addAtIndex: "addAtIndex",
  deleteAtIndex: "deleteAtIndex",
  deleteTail: "deleteTail",
  deleteHead: "deleteHead",
};
export const disabledButton = (name: TButtonName | string, current: TButtonName | string) => {
  return name !== current ? true : false
}
export const headList = (index: number) => {
  return index === 0 ? "head" : null;
};
export const tailList = (index: number, arr: TListCircle[]) => {
  return index === arr.length - 1 ? "tail" : null;
};
export const addToArray = async (
  index: number,
  arr: TListCircle[],
  setListArray: React.Dispatch<React.SetStateAction<TListCircle[]>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setIndexValue: React.Dispatch<React.SetStateAction<string>>
) => {
  await delay(SHORT_DELAY_IN_MS);
  if (arr.length > 0) {
    if (arr[index]) {
      arr[index].color = ElementStates.Modified;
    }
    setListArray(arr);
    await delay(SHORT_DELAY_IN_MS);
    if (arr[index]) arr[index].color = ElementStates.Default;
    setListArray(arr);
    setInputValue("");
    setIndexValue("")
  }
};
export const findIndex = async (
  index: number,
  arr: TListCircle[],
  setArr: React.Dispatch<React.SetStateAction<TListCircle[]>>,
  setInputIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  action: "delete" | "add"
) => {
  for (
    let i = 0;
    action === "delete" ? i < Number(index) : i <= Number(index);
    i++
  ) {
    setInputIndex(i);
    await delay(SHORT_DELAY_IN_MS);
    arr[i].color = ElementStates.Changing;
    setArr([...arr]);
  }
};
