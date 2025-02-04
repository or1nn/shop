import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { Search } from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from './ui/Button';

export const Header = () => {
  const navigate = useNavigate();
  const totalCount = useAppSelector((state) => state.cart.items).reduce(
    (acc, item) => (acc += item.count),
    0
  );
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const totalCountFavorites = useAppSelector(
    (state) => state.user.favorites
  ).length;

  const onClickProfileHandler = () => {
    if (isAuth) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };
  const onClickFavoritesHandler = () => {
    if (isAuth) {
      navigate('/favorites');
    } else {
      navigate('/auth');
    }
  };
  const [active, setActive] = useState(false);
  return (
    <>
      {active && (
        <div
          onClick={() => setActive(false)}
          className="fixed w-full z-10 bg-black/50 h-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-100 p-10 h-full relative"
          >
            <button
              onClick={() => setActive(false)}
              className="cursor-pointer absolute right-3 top-2"
            >
              <AiOutlineClose className="w-7 h-7 fill-gray-400" />
            </button>
            <div className="text-xl font-medium mb-5">Категории</div>
            <ul>
              <li className="text-md mb-5">Смартфоны и планшеты</li>
              <li className="text-md mb-5">Смарт-часы, гаджеты и фото</li>
              <li className="text-md mb-5">Ноутбуки и компьютеры</li>
              <li className="text-md mb-5">Комплектующие для ПК</li>
              <li className="text-md mb-5">Телевизоры, аудио-видео техника</li>
            </ul>
            <div className="text-xl font-medium mb-5">Бренды</div>
            <ul>
              <li className="text-md mb-5">Apple</li>
              <li className="text-md mb-5">Samsung</li>
              <li className="text-md mb-5">Xiaomi</li>
              <li className="text-md mb-5">Honor</li>
              <li className="text-md mb-5">Huawei</li>
            </ul>
          </div>
        </div>
      )}
      <header className="py-5 container mx-auto grid grid-rows-1 grid-cols-[150px_170px_minmax(300px,_1fr)_50px_50px_50px] items-center ">
        <Link to="/">
          <h1 className="text-blue-500 font-bold text-4xl">STORE</h1>
        </Link>
        <div>
          <Button onClick={() => setActive(true)} fz='xl'>
            <AiOutlineMenu className="mr-1" />
            Каталог
          </Button>
        </div>
        <Search />
        <AiOutlineUser
          className="h-8 w-8 cursor-pointer"
          onClick={onClickProfileHandler}
        />
        <button
          onClick={onClickFavoritesHandler}
          className="relative cursor-pointer"
        >
          <span className="absolute w-6 h-6 bg-blue-500 flex justify-center items-center rounded-2xl right-2 -top-2 text-white text-sm">
            {isAuth ? totalCountFavorites : 0}
          </span>
          <AiOutlineHeart className="h-8 w-8" />
        </button>
        <Link to="/cart" className="relative cursor-pointer">
          <span className="absolute w-6 h-6 bg-blue-500 flex justify-center items-center rounded-2xl right-2 -top-2 text-white text-sm">
            {totalCount}
          </span>
          <AiOutlineShoppingCart className="h-8 w-8" />
        </Link>
      </header>
    </>
  );
};
