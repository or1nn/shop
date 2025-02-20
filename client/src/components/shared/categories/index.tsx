import { Link } from 'react-router-dom';
import { Skeleton } from './skeleton';
import { useGetAllCategoriesQuery } from '../../../services/device-api';

export const Categories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery();
  return (
    <div className="py-5">
      <ul className="">
        {isLoading && [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
        {data &&
          data.map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${category.id}`}
                className="mb-2 pb-2 border-[#c5c5c5] cursor-pointer hover:text-blue-500 block"
              >
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
