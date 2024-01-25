import styles from './queue.module.css'
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { useState, ChangeEvent, useEffect } from 'react';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from '../../types/element-states';
import { Queue } from './queue';
import { delay } from '../../services/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export type TQueueCircle = {
  value?: string,
  color: ElementStates;
}
const CirclesQueue = new Queue<TQueueCircle | null>(8)
const defaultQueue: TQueueCircle[] = Array.from({ length: 7 }, () => ({ value: "", color: ElementStates.Default }));

export const QueuePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [queueArray, setQueueArray] = useState<TQueueCircle[]>(defaultQueue)
  const [queue, setQueue] = useState(CirclesQueue)
  const [isLoading, setIsLoading] = useState({
    add: false,
    delete: false,
    clear: false
  });


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const addValue = async () => {
    if (inputValue) {
      setIsLoading(prevState => ({ ...prevState, add: true }))
      setInputValue('');
      CirclesQueue.enqueue({ value: inputValue, color: ElementStates.Default });
      setQueue(CirclesQueue);
      queueArray[queue.getTail() - 1] = { value: '', color: ElementStates.Changing };
      setQueueArray([...queueArray]);
      await delay(SHORT_DELAY_IN_MS);
      queueArray[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Changing };
      setQueueArray([...queueArray]);
      queueArray[queue.getTail() - 1] = { value: inputValue, color: ElementStates.Default };
      setQueueArray([...queueArray]);
      setIsLoading(prevState => ({ ...prevState, add: false }))
    }
  };
  const deleteValue = async() => {
    setIsLoading(prevState => ({ ...prevState, delete: true }))
    queue.dequeue();
    setQueue(queue);
    queueArray[queue.getHead() - 1] = { value: queueArray[queue.getHead() - 1].value, color: ElementStates.Changing };
    setQueueArray([...queueArray]);
    await delay(SHORT_DELAY_IN_MS);
    queueArray[queue.getHead() - 1] = { value: '', color: ElementStates.Default };
    setQueueArray([...queueArray]);
    setIsLoading(prevState => ({ ...prevState, delete: false }))
  }
  const clearQueue = () => {
    setIsLoading(prevState => ({ ...prevState, clear: true }))
    CirclesQueue.clear();
    setQueue(CirclesQueue);
    setQueueArray(Array.from({ length: 7 }, () => ({ value: "", color: ElementStates.Default })))
    setIsLoading(prevState => ({ ...prevState, clear: false }))
  }
  const head = (index: number) => {
    return index === queue.getHead() && !queue.isEmpty() ? 'head' : null
  }
  const tail = (index: number) => {
    return index === queue.getTail() - 1 && !queue.isEmpty() ? 'tail' : null
  }
  return (
    <SolutionLayout title="Очередь">
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

        <Button text="Добавить" disabled={!inputValue} onClick={addValue} isLoader={isLoading.add}/>
        <Button text="Удалить" onClick={deleteValue}  disabled={queue.isEmpty()} isLoader={isLoading.delete}/>
        <Button
          text="Очистить"
          extraClass={styles.cleanButton}
          onClick={clearQueue}
          disabled={queue.isEmpty()}
          isLoader={isLoading.clear}
        />
      </div>
      <ul className={styles.circlesWrapper}>
        {queueArray &&
          queueArray.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.color}
                index={index}
                head={head(index)}
                tail={tail(index)}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
