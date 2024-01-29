import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useState, ChangeEvent } from "react";
import { headList, tailList, addToArray, findIndex, Buttons, disabledButton, TButtonName } from "./list.helpers";
import { LinkedList, Node } from "./linked-list";
import { ElementStates } from "../../types/element-states";
import { randomNum } from "../sorting-page/sorting.func";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { delay } from "../../services/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TListCircle = {
  value: string;
  color: ElementStates;
};

const NewLinkedList = new LinkedList<string>(
  Array.from({ length: 5 }, () => randomNum(0, 99).toString())
);


export const ListPage = () => {
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState({
    addToHead: false,
    addToTail: false,
    addAtIndex: false,
    deleteAtIndex: false,
    deleteTail: false,
    deleteHead: false,
  });
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [listArray, setListArray] = useState<TListCircle[]>(
    NewLinkedList.makeArray()
  );
  const [inputIndex, setInputIndex] = useState<number>();
  const [deletedValue, setDeletedValue] = useState("");
  const [addTo, setAddTo] = useState({
    addToHead: false,
    addToTail: false,
    addToIndex: false,
    deleteTail: false,
    deleteHead: false,
    deleteIndex: false,
  });
  const [currentButton, setCurrentButton] = useState<TButtonName | string>('')
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const addToHead = async () => {
    if (inputValue && NewLinkedList.size < 10) {
      setLoading(true)
      setLoader({ ...loader, addToHead: true });
      setCurrentButton(Buttons.addToHead)
      setInputIndex(0);
      setAddTo({ ...addTo, addToHead: true });
      await delay(SHORT_DELAY_IN_MS);
      NewLinkedList.prepend(inputValue);
      setAddTo({ ...addTo, addToHead: false });

      const arr = NewLinkedList.makeArray();
      await addToArray(0, arr, setListArray, setInputValue);
      setLoader({ ...loader, addToHead: false });
      setCurrentButton('')
      setLoading(false)
    }
  };
  const addToTail = async () => {
    if (inputValue && NewLinkedList.size < 10) {
      setLoading(true)
      setLoader({ ...loader, addToTail: true });
      setCurrentButton(Buttons.addToTail)
      setInputIndex(listArray.length - 1);
      setAddTo({ ...addTo, addToTail: true });

      await delay(SHORT_DELAY_IN_MS);
      NewLinkedList.append(inputValue);
      setAddTo({ ...addTo, addToTail: false });
      const arr = NewLinkedList.makeArray();
      await addToArray(arr.length - 1, arr, setListArray, setInputValue);
      setLoader({ ...loader, addToTail: false });
      setCurrentButton('')
      setLoading(false)
    }
  };
  const deleteTail = async () => {
    setLoading(true)
    setLoader({ ...loader, deleteTail: true });
    setCurrentButton(Buttons.deleteTail)

    setInputIndex(listArray.length - 1);
    setDeletedValue(listArray[listArray.length - 1].value);
    setAddTo({ ...addTo, deleteTail: true });
    listArray[listArray.length - 1].value = "";

    await delay(SHORT_DELAY_IN_MS);
    NewLinkedList.deleteTail();
    setAddTo({ ...addTo, deleteTail: false });
    const arr = NewLinkedList.makeArray();
    if (arr.length === 0) setListArray([]);
    await addToArray(arr.length - 1, arr, setListArray, setInputValue);
    setLoader({ ...loader, deleteTail: false });
    setCurrentButton('')
    setLoading(false)
  };

  const deleteHead = async () => {
    if (NewLinkedList.size > 0) {
      setLoading(true)
      setLoader({ ...loader, deleteHead: true });
      setCurrentButton(Buttons.deleteHead)
      setInputIndex(0);
      setDeletedValue(listArray[0].value);
      setAddTo({ ...addTo, deleteHead: true });
      listArray[0].value = "";

      await delay(SHORT_DELAY_IN_MS);
      NewLinkedList.deleteHead();
      setAddTo({ ...addTo, deleteHead: false });
      const arr = NewLinkedList.makeArray();
      if (arr.length === 0) setListArray([]);
      await addToArray(0, arr, setListArray, setInputValue);
      setLoader({ ...loader, deleteHead: false });
      setCurrentButton('')
      setLoading(false)
    }
  };

  const addIndex = async () => {
    if (
      inputValue &&
      indexValue &&
      Number(indexValue) < NewLinkedList.size &&
      NewLinkedList.size < 10
    ) {
      setLoading(true)
      setLoader({ ...loader, addAtIndex: true });
      setCurrentButton(Buttons.addAtIndex)
      setAddTo({ ...addTo, addToIndex: true });
      const arr = NewLinkedList.makeArray();
      await findIndex(
        Number(indexValue),
        arr,
        setListArray,
        setInputIndex,
        "add"
      );

      setAddTo({ ...addTo, addToIndex: false });
      NewLinkedList.insertAt(inputValue, Number(indexValue));

      const arr2 = NewLinkedList.makeArray();
      await addToArray(Number(indexValue), arr2, setListArray, setInputValue);
      setIndexValue("");
      setLoader({ ...loader, addAtIndex: false });
      setCurrentButton('');
      setLoading(false)
    }
  };

  const deleteIndex = async () => {
    if (indexValue && Number(indexValue) < NewLinkedList.size) {
      setLoading(true)
      setLoader({ ...loader, deleteAtIndex: true });
      setCurrentButton(Buttons.deleteAtIndex)
      const arr = NewLinkedList.makeArray();

      await findIndex(
        Number(indexValue),
        arr,
        setListArray,
        setInputIndex,
        "delete"
      );
      await delay(SHORT_DELAY_IN_MS);
      setDeletedValue(listArray[Number(indexValue)].value);

      setAddTo({ ...addTo, deleteIndex: true });
      arr[Number(indexValue)].value = "";
      setListArray([...arr]);
      setInputIndex(Number(indexValue));
      await delay(SHORT_DELAY_IN_MS);

      setAddTo({ ...addTo, deleteIndex: false });
      NewLinkedList.deleteByIndex(Number(indexValue));
      const arr2 = NewLinkedList.makeArray();
      if (arr.length === 0) setListArray([]);
      await addToArray(Number(indexValue), arr2, setListArray, setInputValue);
      setIndexValue("");

      setLoader({ ...loader, deleteAtIndex: false });
      setCurrentButton('')
      setLoading(false)
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
            disabled={!inputValue || (loading && disabledButton(Buttons.addToHead, currentButton))}
          />
          <Button
            text="Добавить в tail"
            isLoader={loader.addToTail}
            onClick={addToTail}
            disabled={!inputValue || (loading && disabledButton(Buttons.addToTail, currentButton))}
          />
          <Button
            text="Удалить из head"
            isLoader={loader.deleteHead}
            onClick={deleteHead}
            disabled={loading && disabledButton(Buttons.deleteHead, currentButton)}
          />
          <Button
            text="Удалить из tail"
            isLoader={loader.deleteTail}
            onClick={deleteTail}
            disabled={loading && disabledButton(Buttons.deleteTail, currentButton)}
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
            disabled={(!inputValue || !indexValue) || (loading && disabledButton(Buttons.addAtIndex, currentButton))}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.button}
            isLoader={loader.deleteAtIndex}
            onClick={deleteIndex}
            disabled={(!indexValue || Number(indexValue) > listArray.length - 1) || (loading && disabledButton(Buttons.deleteAtIndex, currentButton))}
          />
        </div>
      </div>
      <ul className={styles.list}>
        {listArray.length > 0
          ? listArray.map((item, index) => (
              <li key={index} className={styles.part}>
                <div className={styles.circle}>
                  {(addTo.addToHead || addTo.addToIndex || addTo.addToTail) &&
                    index === Number(inputIndex) && (
                      <div className={styles.circleTop}>
                        <Circle
                          isSmall
                          letter={inputValue}
                          state={ElementStates.Changing}
                        />
                      </div>
                    )}
                  <Circle
                    letter={item.value}
                    state={item.color}
                    index={index}
                    head={!addTo.addToHead ? headList(index) : null}
                    tail={
                      !addTo.deleteTail &&
                      !(
                        addTo.deleteIndex && inputIndex === listArray.length - 1
                      )
                        ? tailList(index, listArray)
                        : null
                    }
                  />
                  {(addTo.deleteHead ||
                    addTo.deleteTail ||
                    addTo.deleteIndex) &&
                    index === Number(inputIndex) && (
                      <div className={styles.circleBottom}>
                        <Circle
                          isSmall
                          letter={deletedValue}
                          state={ElementStates.Changing}
                        />
                      </div>
                    )}
                </div>
                {index !== listArray.length - 1 && <ArrowIcon />}
              </li>
            ))
          : null}
      </ul>
    </SolutionLayout>
  );
};
