import { useState } from 'react';
import {
  Categories,
  SearchEmpty,
  Pagination,
} from '@/components';
import {
  useGetAllDevicesQuery,
  useGetHitDevicesQuery,
} from '@/services/device-api';
import { useAppSelector } from '@/hooks/redux';
import { Slider } from '@components/shared/slider';
import { DevicesList } from '@components/shared/devices-list';

const Home = () => {
  const searchValue = useAppSelector((state) => state.filter.search);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllDevicesQuery({
    search: searchValue,
    categoryId: 0,
    page,
  });
  const { data: hits } = useGetHitDevicesQuery();
  const handlePageClick = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <div className="container mx-auto pt-2">
        <h2 className="text-2xl font-medium mb-4">Главная</h2>
        <div className="grid grid-cols-[200px_1fr] gap-10">
          <Categories />
          {data && data.devices.length === 0 && (
            <SearchEmpty searchValue={searchValue} />
          )}
          <DevicesList items={data!} isLoading={isLoading} />
          <div className="col-start-1 col-end-3 pb-10">
            {data && (
              <Pagination
                totalPages={data?.totalPages}
                onChangePage={handlePageClick}
                currentPage={page}
              />
            )}
            <Slider title="Хиты продаж" items={hits || []} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
