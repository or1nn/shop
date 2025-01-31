import { AiOutlineDelete, AiOutlineHeart } from 'react-icons/ai';
import { ICartItem } from '../store/cart/types';
import { useAppDispatch } from '../hooks/redux';
import { deleteItem, toggleSelectItem } from '../store/cart/slice';
import { BASE_URL } from '../utils/constants';
import { Counter } from './Counter';

export const CartItem: React.FC<ICartItem> = ({
  id,
  title,
  price,
  imageUrl,
  count,
  isSelected,
}) => {
  const dispatch = useAppDispatch();

  const onDeleteItemClick = () => {
    dispatch(deleteItem(id));
  };
  const onChangeSelect = () => {
    dispatch(toggleSelectItem(id));
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
      <Counter limit={true} count={count} id={id} />
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
