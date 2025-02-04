import { BiCartAdd } from 'react-icons/bi';
import { Counter } from './Counter';
import { Button } from './ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addItem } from '../store/cartSlice';
import { IDevice } from '../models/IDevice';

interface ButtonWithCounter {
  type?: string;
  device: IDevice
}

export const ButtonWithCounter: React.FC<ButtonWithCounter> = ({
  device,
  type = 'counterRight',
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.cart.items).find(
    (item) => item.id === device.id
  );
  return (
    <>
      {item ? (
        <div className="flex items-center">
          {type === 'counterRight' ? (
            <>
              <Button
                onClick={() => navigate('/cart')}
                className="w-60 mb-2 py-4 mr-2 rounded-xl"
              >
                <BiCartAdd className="w-6 h-6 mr-1" />
                Оформить заказ
              </Button>
              <Counter limit={false} count={item.count} id={item.id} />
            </>
          ) : (
            <>
              <Counter limit={false} count={item.count} id={item.id} />
              <Button
                onClick={() => navigate('/cart')}
                className="w-50 mb-2 py-4 ml-2 rounded-xl"
              >
                <BiCartAdd className="w-6 h-6 mr-1" />
                Оформить заказ
              </Button>
            </>
          )}
        </div>
      ) : (
        <Button
          onClick={() => dispatch(addItem(device))}
          className="w-full mb-2 py-4 rounded-xl"
        >
          <BiCartAdd className="w-6 h-6 mr-1" />В корзину
        </Button>
      )}
    </>
  );
};
