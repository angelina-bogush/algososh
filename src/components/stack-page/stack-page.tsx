import styles from "./stack.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack";
import { delay } from "../../services/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
type TStackCircle = {
  value: string;
  color: ElementStates;
};
export const CirclesStack = new Stack<TStackCircle>();

export const StackPage = () => {
  const [isLoading, setIsLoading] = useState({
    add: false,
    delete: false,
    clear: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [stackArray, setStackArray] = useState<TStackCircle[]>([]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addValue = async () => {
    if (inputValue) {
      setIsLoading((prevState) => ({ ...prevState, add: true }));
      CirclesStack.push({ value: inputValue, color: ElementStates.Changing });
      setStackArray([...CirclesStack.getStack()]);
      setInputValue("");
      await delay(SHORT_DELAY_IN_MS);
      CirclesStack.peak().color = ElementStates.Default;
      setStackArray([...CirclesStack.getStack()]);
      setIsLoading((prevState) => ({ ...prevState, add: false }));
    }
  };
  const clearStack = () => {
    setIsLoading((prevState) => ({ ...prevState, clear: true }));
    CirclesStack.clear();
    setStackArray([]);
    setIsLoading((prevState) => ({ ...prevState, clear: false }));
  };

  const deleteValue = async () => {
    if (CirclesStack.getStack().length !== 0) {
      if (CirclesStack.peak()) {
        CirclesStack.peak().color = ElementStates.Changing;
      }
      setIsLoading((prevState) => ({ ...prevState, delete: true }));
      setStackArray([...CirclesStack.getStack()]);
      await delay(SHORT_DELAY_IN_MS);
      CirclesStack.pop();
      if (CirclesStack.peak()) {
        CirclesStack.peak().color = ElementStates.Default;
      }
      setStackArray([...CirclesStack.getStack()]);
      setIsLoading((prevState) => ({ ...prevState, delete: false }));
    }
  };

  const head = (item: TStackCircle) => {
    return item === stackArray[stackArray.length - 1] ? "top" : null;
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <Input
          value={inputValue}
          name="stack"
          onChange={onChange}
          isLimitText
          maxLength={4}
          type="text"
          extraClass={styles.input}
        />

        <Button text="Добавить" onClick={addValue} disabled={!inputValue || (isLoading.clear|| isLoading.clear)} isLoader={isLoading.add}/>
        <Button
          text="Удалить"
          onClick={deleteValue}
          disabled={stackArray.length === 0  || (isLoading.add || isLoading.clear)}
          isLoader={isLoading.delete}
        />
        <Button
          text="Очистить"
          extraClass={styles.cleanButton}
          onClick={clearStack}
          disabled={stackArray.length === 0 || (isLoading.add || isLoading.delete)}
          isLoader={isLoading.clear}
        />
      </div>
      <ul className={styles.circlesWrapper}>
        {stackArray &&
          stackArray.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.color}
                index={index}
                head={head(item)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
