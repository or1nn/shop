import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from 'react-icons/ai';
import { useAppSelector } from '@/hooks';
import { Button } from '@components/ui';
import { HeaderPopup, Search } from '@components/shared';

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
      {active && <HeaderPopup setActive={setActive} />}
      <header className="py-5 container mx-auto grid grid-rows-1 grid-cols-[150px_170px_minmax(300px,_1fr)_50px_50px_50px] items-center ">
        <Link to="/">
          <h1 className="text-blue-500 font-bold text-4xl">STORE</h1>
        </Link>
        <div>
          <Button onClick={() => setActive(true)} fz="xl">
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
