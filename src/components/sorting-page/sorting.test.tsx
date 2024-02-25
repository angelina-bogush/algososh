import { bubbleSort, selectionSort, randomNum } from "./sorting.utils";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const array = [9, 3, 8, 4, 6, 5].map((value) => ({ value, color: ElementStates.Default }));
const sortedArrayAsc = [3, 4, 5, 6, 8, 9].map((value) => ({ value, color: ElementStates.Modified }))
const sortedArrayDesc = [9, 8, 6, 5, 4, 3].map((value) => ({ value, color: ElementStates.Modified }))

jest.setTimeout(30000);
const setArray = jest.fn();

describe('Algorithm sorting', () => {
    it('correct bubble sorting of empty array', async () => {
        await bubbleSort([], Direction.Ascending, setArray);
        expect(setArray).toBeCalledTimes(0)
    })
    it('correct bubble ascend sorting of array', async () => {
        await bubbleSort(array, Direction.Ascending, setArray);
        expect(setArray).toHaveBeenLastCalledWith(sortedArrayAsc)
    })
    it('correct bubble desc sorting of array', async () => {
        await bubbleSort(array, Direction.Descending, setArray);
        expect(setArray).toHaveBeenLastCalledWith(sortedArrayDesc)
    })
    it('correct bubble sorting of array with 1 element', async () => {
        await bubbleSort([{ value: 1, color: ElementStates.Modified }], Direction.Ascending, setArray);
        expect(setArray).toBeCalledTimes(0)
    })
    it('correct selection sorting of empty array', async () => {
        await selectionSort([], Direction.Ascending, setArray);
        expect(setArray).toBeCalledTimes(0)
    })
    it('correct selection ascend sorting of array', async () => {
        await selectionSort(array, Direction.Ascending, setArray);
        expect(setArray).toHaveBeenLastCalledWith(sortedArrayAsc)
    })
    it('correct selection desc sorting of array', async () => {
        await selectionSort(array, Direction.Descending, setArray);
        expect(setArray).toHaveBeenLastCalledWith(sortedArrayDesc)
    })
    it('correct selection sorting of array with 1 element', async () => {
        await selectionSort([{ value: 1, color: ElementStates.Modified }], Direction.Ascending, setArray);
        expect(setArray).toBeCalledTimes(0)
    })
})