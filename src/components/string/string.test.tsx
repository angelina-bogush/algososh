
import { reverseArray } from "./string.utils";
import { ElementStates } from "../../types/element-states";

describe("Algorithm reverse string", () => {
  const setArray = jest.fn()
  it('correctly reverse with even items', async() => {
    const string = 'abcd';
    const reversedString = 'dcba';
    const reversedArr = reversedString.trim().split("").map((value) => ({ value, color: ElementStates.Modified }));
    const stringArr = string.trim().split("").map((value) => ({ value, color: ElementStates.Default }));
    await reverseArray(stringArr, setArray)
    expect(setArray).toHaveBeenLastCalledWith(reversedArr)
  })
  it('correctly reverse with odd items', async() => {
    const string = 'abcde';
    const reversedString = 'edcba';
    const reversedArr = reversedString.trim().split("").map((value) => ({ value, color: ElementStates.Modified }));
    const stringArr = string.trim().split("").map((value) => ({ value, color: ElementStates.Default }));
    await reverseArray(stringArr, setArray)
    expect(setArray).toHaveBeenLastCalledWith(reversedArr)
  })
  it('correctly reverse with 1 item', async() => {
    const string = '1';
    const reversedString = '1';
    const reversedArr = reversedString.trim().split("").map((value) => ({ value, color: ElementStates.Modified }));
    const stringArr = string.trim().split("").map((value) => ({ value, color: ElementStates.Default }));
    await reverseArray(stringArr, setArray)
    expect(setArray).toHaveBeenLastCalledWith(reversedArr)
  })
  it('correctly reverse with empty string', async() => {
    const string = '';
    const stringArr = string.trim().split("").map((value) => ({ value, color: ElementStates.Default }));
    await reverseArray(stringArr, setArray)
    expect(setArray).toHaveBeenCalledTimes(0)
  })
  

});