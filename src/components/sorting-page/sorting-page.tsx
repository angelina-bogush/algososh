import styles from './sorting.module.css'
import { ChangeEvent } from 'react';
import { Direction } from '../../types/direction';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState } from "react";
import { Button } from '../ui/button/button';
import { selectionSort, bubbleSort, randomArr } from './sorting.func';

type TSort = 'selection' | 'bubble'
export const SortingPage = () => {
  const [randomNums, setRandomNums] = useState<number[]>([])
  const [sortType, setSortType] = useState<TSort>('selection')
//   const array = randomArr()
//   const heights = array.map((num) => {
//     return `${(340 * num)/100}px`
// })
const createRandomArr = () => {
  const newArr = randomArr()
  setRandomNums(newArr)
}

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <RadioInput
          label="Выбор"
          value={sortType}
          name="selection"
          checked={sortType === "selection"}
          onChange={() => setSortType('selection')}
        />
        <RadioInput
          label="Пузырек"
          extraClass={styles.radio}
          value={sortType}
          name="bubble"
          checked={sortType === "bubble"}
          onChange={() => setSortType('bubble')}
        />
        <Button text="По возрастанию" sorting={Direction.Ascending} />
        <Button
          text="По убыванию"
          extraClass={styles.buttonSort}
          sorting={Direction.Descending}
        />
        <Button text="Новый массив" onClick={createRandomArr} />
      </div>
      <div>
        {randomNums.map((num, index) => (
          <span key={index}>{num}</span>
        ))}
      </div>
    </SolutionLayout>
  );
};
