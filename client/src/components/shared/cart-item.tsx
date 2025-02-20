import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAppDispatch } from '@/hooks';
import {
  deleteItem,
  toggleFavorite,
  toggleSelectItem,
} from '@/store/cart-slice';
import { Counter } from '@components/shared';
import { ICartItem } from '@/models/ICartItem';
import { getFormatNumber, getFormatTitle } from '@/utils';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '@/services/favorites-api';
import { BASE_URL } from '@/services/api';

export const CartItem: React.FC<ICartItem> = ({
  id,
  title,
  price,
  imageUrl,
  count,
  isSelected,
  isFavorite,
}) => {
  const dispatch = useAppDispatch();
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const onDeleteItemClick = () => {
    dispatch(deleteItem(id));
  };
  const onChangeSelect = () => {
    dispatch(toggleSelectItem(id));
  };
  const onClickFavorite = async () => {
    if (isFavorite) {
      await deleteFavorite(id);
    } else {
      await addFavorite(id);
    }
    dispatch(toggleFavorite(id));
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
        <h4 className="text-xl font-medium">{getFormatTitle(title)}</h4>
      </div>
      <Counter limit={true} count={count} id={id} />
      <div className="text-2xl font-medium">{getFormatNumber(price)} ₽</div>
      <div className="flex">
        <button onClick={onClickFavorite} className="cursor-pointer">
          {isFavorite ? (
            <BsBookmarkFill className="w-6 h-6 mr-5 fill-blue-500" />
          ) : (
            <BsBookmark className="h-6 w-6 mr-5 hover:fill-blue-500" />
          )}
        </button>
        <button className="cursor-pointer" onClick={onDeleteItemClick}>
          <AiOutlineDelete className="w-7 h-7 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};
