import { TListCircle } from "./list-page";
import { delay } from "../../services/utils";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) => {
  await delay(SHORT_DELAY_IN_MS);
  if (arr.length > 0) {
  if(arr[index]) {arr[index].color = ElementStates.Modified};
    setListArray(arr);
    await delay(SHORT_DELAY_IN_MS);
    if(arr[index]) arr[index].color = ElementStates.Default;
    setListArray(arr);
    setInputValue("");
  }
};
