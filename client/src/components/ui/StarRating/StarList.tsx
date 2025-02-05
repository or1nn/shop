import { useContext } from 'react';
import { StarRatingContext } from '.';
import { Star } from './Star';

export const StarList = () => {
  const { maxValue } = useContext(StarRatingContext);
  return (
    <div className="flex">
      {[...new Array(maxValue)].map((_, i) => (
        <Star key={i} value={i + 1} />
      ))}
    </div>
  );
};
