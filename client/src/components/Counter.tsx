import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {
  addCertanAmountItems,
  deleteItem,
  minusItem,
  plusItem,
} from '../store/cart/slice';
import { useAppDispatch } from '../hooks/redux';

interface CounterProps {
  count: number;
  id: number;
  limit: boolean;
}

export const Counter: React.FC<CounterProps> = ({ count, id, limit }) => {
  const dispatch = useAppDispatch();
  const onChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    dispatch(addCertanAmountItems({ id, count: value }));
  };
  const onMinusItemClick = () => {
    if (count > 1) {
      dispatch(minusItem(id));
    } else {
      dispatch(deleteItem(id));
    }
  };
  const onAddItemClick = () => {
    dispatch(plusItem(id));
  };

  return (
    <div className="flex items-center">
      <button
        onClick={onMinusItemClick}
        className="cursor-pointer group"
        disabled={limit && !(count > 1)}
      >
        <AiOutlineMinus className="w-5 h-5 text-gray-500 group-disabled:text-gray-300 group-disabled:cursor-default group-hover:text-blue-500" />
      </button>

      <input
        type="number"
        min="1"
        max="999"
        className="border-b-1 text-center w-8 border-gray-500"
        value={count}
        onChange={onChangeCount}
      />
      <button onClick={onAddItemClick} className="cursor-pointer">
        <AiOutlinePlus className="w-5 h-5 text-gray-500 hover:text-blue-500" />
      </button>
    </div>
  );
};
