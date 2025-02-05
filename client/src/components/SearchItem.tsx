import { AiFillMessage, AiFillStar } from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { BASE_URL } from '../utils/constants';
import { ButtonWithCounter } from './ButtonWithCounter';
import { IDevice } from '../models/IDevice';
import { formatNumber } from '../utils/formatNumber';
import { avgRating } from '../utils/avgRating';
import { DeviceInfo } from './DeviceInfo';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '../services/favoritesApi';
import { Link } from 'react-router-dom';

interface SearchItemProps {
  device: IDevice;
}

export const SearchItem: React.FC<SearchItemProps> = ({ device }) => {
  const { imageUrl, title, id, price, isFavorite } = device;
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const onClickFavorite = () => {
    if (isFavorite) {
      deleteFavorite(id);
    } else {
      addFavorite(id);
    }
  };
  return (
    <div className="grid grid-cols-[300px_1fr_200px] mb-2 border-gray-500/30 py-8 relative">
      <Link
        to={`/device/${id}`}
        className="place-items-center place-self-center pr-10"
      >
        <img
          src={`${BASE_URL}/uploads/devices/${imageUrl}`}
          alt="device"
          className="h-55 object-contain "
        />
      </Link>
      <div>
        <Link to={`/device/${id}`} className="text-xl mb-1 hover:text-blue-500">
          {title}
        </Link>
        <div className="flex items-center mb-4">
          <Link to={`/device/${id}`} className="flex mr-2 items-center group">
            <AiFillStar className="w-5 h-5 mr-1 group-hover:fill-blue-500" />
            <div className="group-hover:text-blue-500">
              {avgRating(device.reviews)}
            </div>
          </Link>
          <Link to={`/device/${id}`} className="flex mr-2 items-center group">
            <AiFillMessage className="w-5 h-5 mr-1 group-hover:fill-blue-500" />
            <div className="group-hover:text-blue-500">
              {device.reviews.length} Отзывов
            </div>
          </Link>
          <div className="text-gray-500">Код товара: {id}</div>
        </div>
        <DeviceInfo info={device.info} />
      </div>
      <div className="self-end place-items-end">
        <button
          onClick={onClickFavorite}
          className={`absolute cursor-pointer top-5 right-0`}
        >
          {isFavorite ? (
            <BsBookmarkFill className="w-6 h-6 fill-blue-500" />
          ) : (
            <BsBookmark className="w-6 h-6 hover:fill-blue-500 fill-gray-500" />
          )}
        </button>
        <div className="text-3xl font-medium mb-1">
          {formatNumber(price)}{' '}
          <span className="text-gray-500 font-normal">₽</span>
        </div>
        <ButtonWithCounter device={device} type="Counterleft" />
      </div>
    </div>
  );
};
