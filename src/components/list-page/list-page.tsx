import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useState, ChangeEvent } from "react";
import { headList, tailList, addToArray } from "./list.func";
import { LinkedList, Node } from "./linked-list";
import { ElementStates } from "../../types/element-states";
import { randomNum } from "../sorting-page/sorting.func";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay } from "../../services/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TListCircle = {
  value?: string;
  color: ElementStates;
};
// enum ButtonName {
//   AddToHead = "add to head",
//   AddToTail = "add to tail",
//   DeleteFromTheHead = "delete from the head",
//   DeleteFromTheTail = "delete from to tail",
//   AddByIndex = "add by index",
//   DeleteByIndex = "delete by index",
// }

const NewLinkedList = new LinkedList<string>(
  Array.from({ length: 5 }, () => randomNum(0, 99).toString())
);

export const ListPage = () => {
  const [loader, setLoader] = useState({
    addToHead: false,
    addToTail: false,
    addAtIndex: false,
    deleteAtIndex: false,
    deleteTail: false,
    deleteHead: false,
    disabled: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [listArray, setListArray] = useState<TListCircle[]>(
    NewLinkedList.makeArray()
  );
  const [inputIndex, setInputIndex] = useState<number>();
  const [addTo, setAddTo] = useState({
    addToHead: false,
    addToTail: false,
    addToIndex: false
  })

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const addToHead = async () => {
    if (inputValue && NewLinkedList.size < 10) {

      setLoader({ ...loader, addToHead: true });
      setInputIndex(0);
      setAddTo({...addTo, addToHead: true});
      await delay(SHORT_DELAY_IN_MS);
      NewLinkedList.prepend(inputValue);
      setAddTo({...addTo, addToHead: false});

      const arr = NewLinkedList.makeArray();
      await addToArray(0, arr, setListArray, setInputValue);
      setLoader({ ...loader, addToHead: false });
    }
  };
  const addToTail = async () => {
    if (inputValue && NewLinkedList.size < 10) {
      setLoader({ ...loader, addToTail: true });
      NewLinkedList.append(inputValue);
      const arr = NewLinkedList.makeArray();
      await addToArray(arr.length - 1, arr, setListArray, setInputValue);
      setLoader({ ...loader, addToTail: false });
    }
  };
  const deleteTail = async () => {
    setLoader({ ...loader, deleteTail: true });
    NewLinkedList.deleteTail();
    const arr = NewLinkedList.makeArray();
    if (arr.length === 0) setListArray([]);
    await addToArray(arr.length - 1, arr, setListArray, setInputValue);
    setLoader({ ...loader, deleteTail: false });
  };

  const deleteHead = async () => {
    setLoader({ ...loader, deleteHead: true });
    NewLinkedList.deleteHead();
    const arr = NewLinkedList.makeArray();
    if (arr.length === 0) setListArray([]);
    await addToArray(0, arr, setListArray, setInputValue);
    setLoader({ ...loader, deleteHead: false });
  };
  const addIndex = async () => {
    if (inputValue && indexValue && Number(indexValue) <= NewLinkedList.size) {
      setLoader({ ...loader, addAtIndex: true });
      NewLinkedList.insertAt(inputValue, Number(indexValue));
      const arr = NewLinkedList.makeArray();
      await addToArray(Number(indexValue), arr, setListArray, setInputValue);
      setLoader({ ...loader, addAtIndex: false });
    }
  };
  const deleteIndex = async () => {
    if (indexValue && Number(indexValue) < NewLinkedList.size) {
      setLoader({ ...loader, deleteAtIndex: true });
      NewLinkedList.deleteByIndex(Number(indexValue));
      const arr = NewLinkedList.makeArray();
      if (arr.length === 0) setListArray([]);
      await addToArray(Number(indexValue), arr, setListArray, setInputValue);
      setLoader({ ...loader, deleteAtIndex: false });
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <div className={styles.inputs}>
          <Input
            value={inputValue}
            extraClass={styles.input}
            name="value"
            onChange={onChangeInput}
            isLimitText
            maxLength={4}
            type="text"
          />
          <Button
            text="Добавить в head"
            isLoader={loader.addToHead}
            onClick={addToHead}
          />
          <Button
            text="Добавить в tail"
            isLoader={loader.addToTail}
            onClick={addToTail}
          />
          <Button
            text="Удалить из head"
            isLoader={loader.deleteHead}
            onClick={deleteHead}
          />
          <Button
            text="Удалить из tail"
            isLoader={loader.deleteTail}
            onClick={deleteTail}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            value={indexValue}
            extraClass={styles.input}
            name="index"
            onChange={onChangeIndex}
            type="number"
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.button}
            isLoader={loader.addAtIndex}
            onClick={addIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.button}
            isLoader={loader.deleteAtIndex}
            onClick={deleteIndex}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {listArray.length > 0
          ? listArray.map((item, index) => (
              <li key={index} className={styles.part}>
                {/* <div className={styles.circleTop}>
                  <Circle isSmall letter={inputValue} state={ElementStates.Changing}/>
                </div> */}
                <div className={styles.circle}>
                {(addTo.addToHead || addTo.addToIndex || addTo.addToTail) && index === Number(indexValue) && <div className={styles.circleTop}>
                  <Circle isSmall letter={inputValue} state={ElementStates.Changing}/>
                </div> }
                  <Circle
                    letter={item.value}
                    state={item.color}
                    index={index}
                    head={!addTo.addToHead && !addTo.addToTail ? headList(index) : null}
                    tail={tailList(index, listArray)}
                  />
                </div>
                {index !== listArray.length - 1 && <ArrowIcon />}
              </li>
            ))
          : null}
      </ul>
    </SolutionLayout>
  );
};
