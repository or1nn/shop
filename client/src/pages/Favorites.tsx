import { DeviceCard } from '../components/DeviceCard';
import { useAppSelector } from '../hooks/redux';

const Favorites = () => {
  const favorites = useAppSelector((state) => state.user.favorites);
  return (
    <div className="container mx-auto">
      <h3 className="font-bold text-3xl mb-5">Избранное</h3>
      <div className="grid grid-cols-5">
        {favorites.map((item) => (
          <DeviceCard key={item.id} device={item.device} isFavorite={true} />
        ))}
      </div>
    </div>
  );
};
export default Favorites;
