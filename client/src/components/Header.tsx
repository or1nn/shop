import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { Search } from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

export const Header = () => {
  const navigate = useNavigate();
  const totalCount = useAppSelector((state) => state.cart.items).reduce(
    (acc, item) => (acc += item.count),
    0
  );
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const onClickProfileHandler = () => {
    if (isAuth) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };
  return (
    <>
      <header className="py-5 container mx-auto grid grid-rows-1 grid-cols-[150px_170px_minmax(300px,_1fr)_50px_50px_50px] items-center ">
        <Link to="/">
          <h1 className="text-blue-500 font-bold text-4xl">STORE</h1>
        </Link>
        <div>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-md font-medium text-xl cursor-pointer flex items-center ">
            <AiOutlineMenu className="mr-1" />
            Каталог
          </button>
        </div>
        <Search />
        <AiOutlineUser
          className="h-8 w-8 cursor-pointer"
          onClick={onClickProfileHandler}
        />

        <div className="relative cursor-pointer">
          <span className="absolute w-6 h-6 bg-blue-500 flex justify-center items-center rounded-2xl right-2 -top-2 text-white text-sm">
            1
          </span>
          <AiOutlineHeart className="h-8 w-8" />
        </div>
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
