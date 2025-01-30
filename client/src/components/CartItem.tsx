import {
  AiOutlineDelete,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { ICartItem } from '../store/cart/types';
import { useAppDispatch } from '../hooks/redux';
import {
  addCertanAmountItems,
  addItem,
  deleteItem,
  minusItem,
  toggleSelectItem,
} from '../store/cart/slice';
import { ChangeEvent } from 'react';
import { BASE_URL } from '../utils/constants';

export const CartItem: React.FC<ICartItem> = ({
  id,
  title,
  price,
  imageUrl,
  count,
  isSelected,
}) => {
  const dispatch = useAppDispatch();
  const onAddItemClick = () => {
    dispatch(addItem({ id, title, price, imageUrl }));
  };
  const onMinusItemClick = () => {
    dispatch(minusItem(id));
  };
  const onDeleteItemClick = () => {
    dispatch(deleteItem(id));
  };
  const onChangeSelect = () => {
    dispatch(toggleSelectItem(id));
  };
  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    dispatch(addCertanAmountItems({ id, count: value }));
  };
  return (
    <div className="grid grid-cols-[100px_100px_1fr_100px_130px_100px] gap-x-5 items-center px-10 rounded-md mb-5">
      <input
        type="checkbox"
        className="w-6 h-6"
        checked={isSelected}
        onChange={onChangeSelect}
      />
      <img
        src={`${BASE_URL}/uploads/devices/${imageUrl}`}
        alt=""
        className="w-20"
      />
      <div>
        <div className="text-gray-500">Код товара: {id}</div>
        <h4 className="text-xl font-medium">{title}</h4>
      </div>
      <div className="flex items-center">
        <button
          onClick={onMinusItemClick}
          className="cursor-pointer group"
          disabled={!(count > 1)}
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
      <div className="text-2xl font-medium">{price} ₽</div>
      <div className="flex">
        <button className="cursor-pointer">
          <AiOutlineHeart className="w-8 h-8 mr-5 hover:text-blue-500" />
        </button>
        <button className="cursor-pointer" onClick={onDeleteItemClick}>
          <AiOutlineDelete className="w-8 h-8 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};
