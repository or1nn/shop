import { useParams } from 'react-router-dom';
import { SearchItem } from '../components/SearchItem';
import { useAppSelector } from '../hooks/redux';
import {
  useGetAllDevicesByCategoryQuery,
} from '../services/deviceApi';
import { useState } from 'react';
import { Sort } from '../components/Sort';

const categories = [
  'Смартфоны и планшеты',
  'Смарт-часы, гаджеты и фото',
  'Ноутбуки и компьютеры',
  'Комплектующие для ПК',
];
const SearchPage = () => {
  const { id } = useParams();
  const search = useAppSelector((state) => state.filter.search);
  const [sort, setSort] = useState(0);
  const [order, setOrder] = useState('desc');
  const { data, isLoading } = useGetAllDevicesByCategoryQuery({
    categoryId: Number(id),
    search,
    sortBy: Number(sort),
    order
  });
  if (isLoading) {
    return '...';
  }

  return (
    <div className="container mx-auto pt-2">
      <h2 className="text-2xl font-medium mb-4">
        {categories[Number(id) - 1]}{' '}
        <span className="text-gray-500 font-normal">
          {data!.length} товаров
        </span>
      </h2>
      <Sort order={order} sort={sort} setSort={setSort} setOrder={setOrder}/>
      <div className="grid">
        {data!.map((item) => (
          <SearchItem
            key={item.id}
            device={item}
          />
        ))}
      </div>
    </div>
  );
};
export default SearchPage;
