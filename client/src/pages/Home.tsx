import { Categories } from '../components/Categories';
import { DeviceCard } from '../components/DeviceCard';
import { Skeleton } from '../components/DeviceCard/Skeleton';
import { useGetAllDevicesQuery } from '../services/deviceApi';
const Home = () => {
  const { data, isLoading, error } = useGetAllDevicesQuery('');

  return (
    <>
      <div className="container mx-auto grid grid-cols-[200px_1fr] mt-10 gap-10">
        <div>
          <Categories />
        </div>
        <div className="grid grid-cols-5 gap-3 grid-rows-[365px_365px]">
          {isLoading && [...new Array(10)].map((_, i) => <Skeleton key={i} />)}
          {data &&
            data.map((device) => (
              <DeviceCard
                key={device.id}
                id={device.id}
                title={device.title}
                price={device.price}
                imageUrl={device.imageUrl}
              />
            ))}
        </div>
      </div>
    </>
  );
};
export default Home;
