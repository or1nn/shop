import { BsCartPlus } from 'react-icons/bs';
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
import { BiBookmark } from 'react-icons/bi';

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
    dispatch(addItem(device));
  };
  return (
    <Link
      to={`/device/${id}`}
      className="group grid hover:shadow-xl grid-rows-[200px_1fr_45px] rounded-xl outline-[#c5c5c5] py-5 cursor-pointer"
    >
      <div className="flex justify-between w-full px-5">
        <img
          src={`${BASE_URL}/uploads/devices/${imageUrl}`}
          className="h-50 object-cover"
          alt="device"
        />

        <button className="h-7 cursor-pointer" onClick={addFavoriteHandler}>
          {isAuth && isFavorite ? (
            <BiBookmark className="h-7 w-7 fill-blue-500" />
          ) : (
            <BiBookmark className="h-7 w-7 fill-gray-500" />
          )}
        </button>
      </div>
      <div className="font-medium text-gray-500 px-4 group-hover:text-blue-500 mt-2">
        {title}
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
