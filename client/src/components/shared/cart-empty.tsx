import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-center text-2xl">В корзине нет товаров</h4>
      <p className="text-gray-500 text-center mb-4">
        Найдите то, что вам нужно в каталоге
      </p>
      <Link
        to="/"
        className="outline-1 text-gray-700 text-center w-60 py-2 rounded-md hover:outline-blue-500 hover:text-blue-500"
      >
        Вернуться к покупкам
      </Link>
    </div>
  );
};
