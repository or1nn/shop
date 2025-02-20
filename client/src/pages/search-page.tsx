import { useParams } from 'react-router-dom';
import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetAllDevicesQuery,
} from '@/services/device-api';
import { Sort, SearchEmpty, Pagination, SearchItem } from '@/components';
import { useFilters } from '@/hooks/use-filters';

const SearchPage = () => {
  const { id } = useParams();
  const { search, sort, order, page, filter, setOrder, setPage, setSort } =
    useFilters();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const { data, isLoading } = useGetAllDevicesQuery({
    search,
    page,
    categoryId: filter === 'category' ? Number(id) : undefined,
    brandId: filter === 'brand' ? Number(id) : undefined,
    sortBy: sort,
    order,
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
