import { useParams } from 'react-router-dom';
import { AiFillMessage } from 'react-icons/ai';
import { BiBookmark } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { useGetDeviceByIdQuery } from '@/services/device-api';
import { useAppSelector } from '@/hooks';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '@/services/favorites-api';
import { getAvgRating, getFormatNumber } from '@/utils';
import {
  DeviceInfo,
  ReviewContainer,
  ButtonWithCounter,
} from '@components/shared';
import { BASE_URL } from '@services/api';
import { Button } from '@components/ui';

const DevicePage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetDeviceByIdQuery(id!);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const isFavorite = useAppSelector((state) => state.user.favorites).some(
    (item) => item.deviceId === Number(id)
  );
  if (isLoading) {
    return 'loading';
  }
  const { id: deviceId, imageUrl, title, price } = data!;
  const addFavoriteHander = async () => {
    if (isFavorite) {
      await deleteFavorite(deviceId);
    } else {
      await addFavorite(deviceId);
    }
  };

  return (
    <div className="container mx-auto pt-5">
      <div>
        <h3 className="font-medium text-xl mb-2">{title}</h3>
        <div className="flex items-center mb-5">
          <div className="flex mr-2 items-center">
            <AiFillStar className="w-5 h-5 mr-1" />
            <div>{getAvgRating(data!.reviews)}</div>
          </div>
          <div className="flex mr-2 items-center">
            <AiFillMessage className="w-5 h-5 mr-1" />
            <div>{data!.reviews.length} Отзывов</div>
          </div>
          <div className="text-gray-500">Код товара: {deviceId}</div>
        </div>
        <div className="grid grid-cols-[300px_1fr_325px] gap-x-20 mb-8">
          <div className="ml-8">
            <img src={`${BASE_URL}/uploads/devices/${imageUrl}`} alt="device" />
          </div>
          <DeviceInfo info={data!.info} />
          <div className="mr-5">
            <div className="text-4xl font-medium mb-2">
              {getFormatNumber(price)}{' '}
              <span className="text-gray-500 font-normal">₽</span>
            </div>
            <ButtonWithCounter device={data!} />
            <Button
              variant="outline"
              onClick={addFavoriteHander}
              isActive={isFavorite}
              className="py-4 w-full rounded-xl font-medium"
            >
              <BiBookmark className="w-6 h-6 mr-1" />
              {isFavorite ? 'Добавлено' : 'В избранное'}
            </Button>
          </div>
        </div>
      </div>
      <ReviewContainer deviceId={deviceId} reviews={data!.reviews} />
    </div>
  );
};
export default DevicePage;
