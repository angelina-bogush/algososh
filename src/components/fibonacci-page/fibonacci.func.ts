import { DELAY_IN_MS } from './../../constants/delays';
import { delay } from "../../services/utils";

export const makeFibonacciArray = async (num: number) => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < num + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

export const fibonacciDelay = async(num: number, setFibonacciArray: React.Dispatch<React.SetStateAction<number[]>>) => {
    const arr = await makeFibonacciArray(num);
    for (let i = 0; i < arr.length; i++) {
      await delay(DELAY_IN_MS);
      setFibonacciArray(arr.slice(0, i + 1));
    }
}