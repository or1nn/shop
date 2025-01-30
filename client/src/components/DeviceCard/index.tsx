import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { useAppDispatch } from '../../hooks/redux';
import { addItem } from '../../store/cart/slice';
import { BASE_URL } from '../../utils/constants';

interface DeviceCardProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  title,
  price,
  imageUrl,
}) => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const addFavoriteHandler = () => {
    setActive((state) => !state);
  };
  const addCartHandler = () => {
    dispatch(addItem({ id, title, price, imageUrl }));
  };
  return (
    <div className="group grid hover:shadow-xl grid-rows-[200px_1fr_45px] rounded-md outline-[#c5c5c5] py-5 cursor-pointer">
      <div className="flex justify-between w-full px-5">
        <img
          src={`${BASE_URL}/uploads/devices/${imageUrl}`}
          className="h-50 object-cover"
          alt="device"
        />

        <button className="h-7 cursor-pointer" onClick={addFavoriteHandler}>
          {active ? (
            <AiFillHeart className="h-7 w-7 fill-red-500" />
          ) : (
            <AiOutlineHeart className="h-7 w-7 fill-gray-500" />
          )}
        </button>
      </div>
      <div className="font-medium text-gray-600 px-4 group-hover:text-blue-500 mt-2">
        {title}
      </div>
      <div className="flex justify-between items-center w-full px-4">
        <div className="font-medium text-2xl ">
          {price} <span className="text-gray-400 ">₽</span>
        </div>
        <button
          onClick={addCartHandler}
          className="bg-blue-500 text-white font-medium rounded-3xl p-2 mt-2 cursor-pointer hover:bg-[#579aff]"
        >
          <BsCartPlus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
