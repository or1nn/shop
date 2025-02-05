import { useLocation, useParams } from 'react-router-dom';
import { SearchItem } from '../components/SearchItem';
import { useAppSelector } from '../hooks/redux';
import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetAllDevicesQuery,
} from '../services/deviceApi';
import { useState } from 'react';
import { Sort } from '../components/Sort';
import { SearchEmpty } from '../components/SearchEmpty';
import { Pagination } from '../components/Pagination';

const SearchPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const filter = location.pathname.split('/')[1];
  const search = useAppSelector((state) => state.filter.search);
  const [sort, setSort] = useState(0);
  const [order, setOrder] = useState('desc');
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const { data, isLoading } = useGetAllDevicesQuery({
    categoryId: filter === 'category' ? Number(id) : undefined,
    brandId: filter === 'brand' ? Number(id) : undefined,
    search,
    sortBy: Number(sort),
    order,
    page,
  });
  if (isLoading) {
    return '...';
  }
  return (
    <div className="container mx-auto pt-2">
      <h2 className="text-2xl font-medium mb-4">
        {filter === 'category'
          ? categories![Number(id) - 1].name
          : brands![Number(id) - 1].name}{' '}
        <span className="text-gray-500 font-normal">
          {data!.devices.length} товаров
        </span>
      </h2>
      {data!.devices.length === 0 && <SearchEmpty searchValue={search} />}
      {data!.devices.length !== 0 && (
        <Sort order={order} sort={sort} setSort={setSort} setOrder={setOrder} />
      )}
      <div className="grid">
        {data!.devices.map((item) => (
          <SearchItem key={item.id} device={item} />
        ))}
      </div>
      {data && (
        <Pagination
          currentPage={page}
          totalPages={data!.totalPages}
          onChangePage={(page) => setPage(page)}
        />
      )}
    </div>
  );
};
export default SearchPage;
