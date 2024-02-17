import React, { useState } from "react";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ChangeEvent } from "react";
import { swapFunc } from "../../services/utils";
import { delay } from "../../services/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export type TArray = {
  value: string | number;
  color: ElementStates;
};

export const StringComponent = () => {
  const [string, setString] = useState("");
  const [arrayLetter, setArrayLetter] = useState<Array<TArray>>([]);
  const [loading, setLoading] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value);
  };

  const reverseArray = async (
    arr: TArray[] | [],
    setArray: React.Dispatch<React.SetStateAction<TArray[]>>
  ) => {
    const mid = Math.ceil(arr.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = arr.length - 1 - i;
      arr[i].color = arr[j].color = ElementStates.Changing;
      setArray([...arr]);
      await delay(DELAY_IN_MS);

      swapFunc(arr, i, j);

      arr[i].color = arr[j].color = ElementStates.Modified;
      setArray([...arr]);
    }
  };

  const submitInput = async (e: React.FormEvent, string: string) => {
    e.preventDefault();
    setLoading(true);
    const arr = string
      .trim()
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));
    setArrayLetter([...arr]);
    await delay(DELAY_IN_MS);
    await reverseArray(arr, setArrayLetter);
    setLoading(false);
  };
  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.input}
        onSubmit={(e: React.FormEvent) => submitInput(e, string)}
      >
        <Input value={string} onChange={onChange} isLimitText maxLength={11} data-testid="inputString"/>
        <Button
          data-testid="button"
          type="submit"
          text="Развернуть"
          disabled={!string}
          isLoader={loading}
        />
      </form>
      {/* <p data-testid='id' ></p> */}
      <div className={styles.reverseString} data-testid="result">
        {arrayLetter &&
          arrayLetter.map((letter, index) => (
            <div key={index} data-testid='id'>
              <Circle letter={String(letter.value)} state={letter.color}/>
            </div>
          ))}
      </div>
    </SolutionLayout>
  );
};
