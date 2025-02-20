import { CartItem, CartEmpty } from '@components/shared';
import { Button } from '@components/ui';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { deleteAlItems } from '../store/cart-slice';
import { getFormatNumber } from '@/utils';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const totalCount = items.reduce((acc, item) => (acc += item.count), 0);
  const onDeleteAllItemsClick = () => {
    if (confirm('Вы уверены?')) {
      dispatch(deleteAlItems());
    }
  };
  return (
    <div className="container mx-auto pt-2">
      <h3 className="font-medium text-2xl mb-4">Корзина</h3>
      <div className="grid grid-cols-[1fr_300px]">
        <div>
          {items.length === 0 && <CartEmpty />}
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              isSelected={item.isSelected}
              count={item.count}
              title={item.title}
              imageUrl={item.imageUrl}
              price={item.price}
              reviews={item.reviews}
              isFavorite={item.isFavorite}
            />
          ))}
        </div>
        <div>
          <div className="bg-gray-200 p-10 h-70 flex flex-col justify-between mb-4 rounded-md">
            <div>
              <div className="font-medium text-xl">В корзине</div>
              <div className="mb-5">{getFormatNumber(totalCount)} товаров</div>
              <div className="font-medium text-2xl">
                {getFormatNumber(totalPrice)} ₽
              </div>
            </div>
            <Button className="w-full" fz="normal">
              Перейти к оформлению
            </Button>
          </div>
          <button className="outline-1 text-gray-700 py-2 w-full rounded-md cursor-pointer mb-4">
            Добавить все в избранное
          </button>
          <button
            className="outline-1 text-red-500 py-2 w-full rounded-md cursor-pointer disabled:cursor-default disabled:text-red-300"
            onClick={onDeleteAllItemsClick}
            disabled={!Boolean(totalPrice)}
          >
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
