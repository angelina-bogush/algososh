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
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [string, setString] = useState("");
  const [arrayLetter, setArrayLetter] = useState<Array<TArray>>([]);
  const [loading, setLoading] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.currentTarget.value);
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
      try {
        await reverseArray(arr, setArrayLetter);
      } catch (error) {
        console.error(error);
      }    
    setLoading(false);
  };
  return (
    <SolutionLayout title="Строка">
      <form
        className={styles.input}
        onSubmit={(e: React.FormEvent) => submitInput(e, string)}
      >
        <Input value={string} onChange={onChange} isLimitText maxLength={11} />
        <Button
          type="submit"
          text="Развернуть"
          disabled={!string}
          isLoader={loading}
        />
      </form>
      <div className={styles.reverseString}>
        {arrayLetter &&
          arrayLetter.map((letter, index) => (
            <div key={index}>
              <Circle letter={letter.value} state={letter.color} />
            </div>
          ))}
      </div>
    </SolutionLayout>
  );
};
