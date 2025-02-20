import { AiOutlineClose } from 'react-icons/ai';
import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
} from '@/services/device-api';
import { Link } from 'react-router-dom';

interface HeaderPopupProps {
  setActive: (active: boolean) => void;
}

export const HeaderPopup: React.FC<HeaderPopupProps> = ({ setActive }) => {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  return (
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
          {categories?.map((item) => (
            <li key={item.name} className="text-md mb-5 hover:text-blue-500">
              <Link
                to={`/category/${item.id}`}
                onClick={() => setActive(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-xl font-medium mb-5">Бренды</div>
        <ul>
          {brands?.map((item) => (
            <li key={item.name} className="text-md mb-5 hover:text-blue-500">
              <Link to={`/brand/${item.id}`} onClick={() => setActive(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
