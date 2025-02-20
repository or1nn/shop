import { DeviceCard } from '@components/shared';
import { useAppSelector } from '@/hooks';

const Favorites = () => {
  const favorites = useAppSelector((state) => state.user.favorites);
  return (
    <div className="container mx-auto pt-2">
      <h2 className="font-medium text-2xl mb-4">Избранное</h2>
      <div className="grid grid-cols-5">
        {favorites.map((item) => (
          <DeviceCard key={item.id} device={item.device} isFavorite={true} />
        ))}
      </div>
    </div>
  );
};
export default Favorites;
