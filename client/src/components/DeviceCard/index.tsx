import { BsBookmarkFill, BsCartPlus } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addItem } from '../../store/cartSlice';
import { BASE_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '../../services/favoritesApi';
import { toast } from 'react-toastify';
import { IDevice } from '../../models/IDevice';
import { formatNumber } from '../../utils/formatNumber';
import { BsBookmark } from 'react-icons/bs';
import { formatTitle } from '../../utils/formatTitle';

interface DeviceCardProps {
  device: IDevice;
  isFavorite: boolean;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  isFavorite,
}) => {
  const { id, imageUrl, title, price } = device;

  const dispatch = useAppDispatch();
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const addFavoriteHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuth) {
      if (isFavorite) {
        await deleteFavorite(id);
      } else {
        await addFavorite(id);
        toast.success('Товар успешно добавлен в избранное');
      }
    } else {
      toast.error('Необходима авторизация');
    }
  };
  const addCartHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addItem({ ...device, isFavorite }));
  };
  return (
    <Link
      to={`/device/${id}`}
      className="group grid h-91 hover:shadow-xl grid-rows-[200px_1fr_45px] rounded-xl outline-[#c5c5c5] py-5 cursor-pointer relative"
    >
      <div className="flex justify-between w-full px-5">
        <div className="overflow-hidden pr-7">
          <img
            src={`${BASE_URL}/uploads/devices/${imageUrl}`}
            className="object-contain h-50 w-full"
            alt="device"
          />
        </div>
        <button
          className="h-7 absolute right-4 cursor-pointer"
          onClick={addFavoriteHandler}
        >
          {isAuth && isFavorite ? (
            <BsBookmarkFill className="h-6 w-6 fill-blue-500" />
          ) : (
            <BsBookmark className="h-6 w-6 fill-gray-500 hover:fill-blue-500" />
          )}
        </button>
      </div>
      <div className="font-medium text-gray-500 px-4 group-hover:text-blue-500 mt-2">
        {formatTitle(title)}
      </div>
      <div className="flex justify-between items-center w-full px-4">
        <div className="font-medium text-2xl ">
          {formatNumber(price)}{' '}
          <span className="text-gray-500 font-normal ">₽</span>
        </div>
        <button
          onClick={addCartHandler}
          className="bg-blue-500 text-white font-medium rounded-3xl p-2 cursor-pointer hover:bg-[#579aff]"
        >
          <BsCartPlus className="w-6 h-6" />
        </button>
      </div>
    </Link>
  );
};
