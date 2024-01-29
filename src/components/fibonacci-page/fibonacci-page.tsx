import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ChangeEvent } from "react";
import { FormEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { fibonacciDelay } from "./fibonacci.utils";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [fibonacciArray, setFibonacciArray] = useState<Array<number>>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    if (!number) return;
    setLoading(true);
    e.preventDefault();
    await fibonacciDelay(number, setFibonacciArray);
    setLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        className={styles.input}
        onSubmit={(e: FormEvent) => handleSubmit(e)}
      >
        <Input
          value={number}
          isLimitText
          max={19}
          type="number"
          onChange={onChange}
        />
        <Button
          text="Рассчитать"
          disabled={!number}
          isLoader={loading}
          type="submit"
        />
      </form>
      <ul className={styles.circles}>
        {fibonacciArray.length !== 0 &&
          fibonacciArray.map((num, index) => (
            <Circle key={index} letter={String(num)} index={index} />
          ))}
      </ul>
    </SolutionLayout>
  );
};
