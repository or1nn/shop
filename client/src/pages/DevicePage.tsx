import { useParams } from 'react-router-dom';
import { useGetDeviceByIdQuery } from '../services/deviceApi';
import { AiFillMessage } from 'react-icons/ai';
import { BiCartAdd } from 'react-icons/bi';
import { BiBookmark } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { BASE_URL } from '../utils/constants';
import { ReviewContainer } from '../components/ReviewContainer';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addItem } from '../store/cart/slice';
import { Counter } from '../components/Counter';

const DevicePage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data, isLoading } = useGetDeviceByIdQuery(id!);
  const item = useAppSelector((state) => state.cart.items).find(
    (item) => item.id === Number(id)
  );
  if (isLoading) {
    return 'loading';
  }
  const { id: deviceId, imageUrl, title, price } = data!;
  return (
    <div className="container mx-auto pt-5">
      <h3 className="font-medium text-xl mb-2">{title}</h3>
      <div className="flex items-center mb-5">
        <div className="flex mr-2 items-center">
          <AiFillStar className="w-5 h-5 mr-1" />
          <div>5</div>
        </div>
        <div className="flex mr-2 items-center">
          <AiFillMessage className="w-5 h-5 mr-1" />
          <div>5 Отзывов</div>
        </div>
        <div className="text-gray-500">Код товара: {deviceId}</div>
      </div>
      <div className="grid grid-cols-[300px_500px_1fr] gap-x-20 mb-8">
        <div className="ml-8">
          <img src={`${BASE_URL}/uploads/devices/${imageUrl}`} alt="device" />
        </div>
        <ul>
          <li>
            <span className="text-gray-500">Экран:</span> AMOLED Super AMOLED
            FHD+, 6.6" (2340x1080) Процессор: Samsung
          </li>
          <li>
            <span className="text-gray-500">Exynos 1480 Память:</span>{' '}
            оперативная 8 ГБ, встроенная 256 ГБ
          </li>
          <li>
            <span className="text-gray-500">Аккумулятор:</span> Li-Pol, 5000
            мAч, несъемный Поддержка сетей: 2G/3G/4G (LTE)/5G{' '}
          </li>
        </ul>
        <div>
          <div className="text-4xl font-medium mb-2">
            {price} <span className="text-gray-400">₽</span>
          </div>
          {item ? (
            <div className="flex items-center">
              <button className="bg-blue-500 text-white py-4 w-60 rounded-xl font-medium mb-2 cursor-pointer flex justify-center items-center mr-2">
                <BiCartAdd className="w-6 h-6 mr-1" />
                Оформить заказ
              </button>
              <Counter limit={false} count={item.count} id={Number(id)} />
            </div>
          ) : (
            <button
              onClick={() =>
                dispatch(addItem({ id: deviceId, imageUrl, price, title }))
              }
              className="bg-blue-500 text-white py-4 w-80 rounded-xl font-medium mb-2 cursor-pointer flex justify-center items-center"
            >
              <BiCartAdd className="w-6 h-6 mr-1" />В корзину
            </button>
          )}
          <button className="border-1 border-blue-500 text-blue-500 py-4 w-80 rounded-xl font-medium cursor-pointer flex justify-center items-center">
            <BiBookmark className="w-6 h-6" />В избранное
          </button>
        </div>
      </div>
      <ReviewContainer />
    </div>
  );
};
export default DevicePage;
