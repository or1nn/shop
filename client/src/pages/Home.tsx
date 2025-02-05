import { Categories } from '../components/Categories';
import { DeviceCard } from '../components/DeviceCard';
import { Skeleton } from '../components/DeviceCard/Skeleton';
import {
  useGetAllDevicesQuery,
  useGetHitDevicesQuery,
} from '../services/deviceApi';
import { useAppSelector } from '../hooks/redux';
import { SearchEmpty } from '../components/SearchEmpty';
import Slider from 'react-slick';
import { NextArrow } from '../components/ui/Arrows/NextArrow';
import { PrevArrow } from '../components/ui/Arrows/PrevArrow';
import { useState } from 'react';
import { Pagination } from '../components/Pagination';

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
          <div className="grid grid-cols-5 gap-3 grid-rows-[365px_365px]">
            {isLoading &&
              [...new Array(10)].map((_, i) => <Skeleton key={i} />)}
            {data &&
              data.devices.map((device) => (
                <DeviceCard
                  isFavorite={device.isFavorite || false}
                  key={device.id}
                  device={device}
                />
              ))}
          </div>
          <div className="col-start-1 col-end-3 pb-10">
            {data && (
              <Pagination
                totalPages={data?.totalPages}
                onChangePage={handlePageClick}
                currentPage={page}
              />
            )}
            <h2 className="text-2xl font-medium mb-4">Хиты продаж</h2>
            <Slider
              slidesToShow={5}
              infinite={true}
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
            >
              {hits &&
                hits!.map((item) => (
                  <DeviceCard
                    isFavorite={item.isFavorite || false}
                    key={item.id}
                    device={item}
                  />
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
