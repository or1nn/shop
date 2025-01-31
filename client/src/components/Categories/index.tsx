import { useGetAllCategoriesQuery } from '../../services/deviceApi';
import { Skeleton } from './Skeleton';

export const Categories = () => {
  const { data, isLoading, error } = useGetAllCategoriesQuery('');
  return (
    <div className="">
      <ul className="">
        {isLoading && [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
        {data &&
          data.map((category) => (
            <li
              key={category.id}
              className="mb-2 border-b-1 pt-2 pb-2 border-[#c5c5c5] cursor-pointer"
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
