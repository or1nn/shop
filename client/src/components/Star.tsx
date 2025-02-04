import clsx from 'clsx';
import { useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { StarRatingContext } from './StarRating';

interface StarProps {
  value: number;
}

export const Star: React.FC<StarProps> = ({ value }) => {
  const { hover, rating, setRating, setHover, emptyColor, fillColor, readOnly } = useContext(StarRatingContext);
  return (
    <button className={clsx(!readOnly && 'cursor-pointer')}>
      <AiFillStar
        onClick={() => setRating(value)}
        onMouseEnter={() => setHover(value)}
        onMouseLeave={() => setHover(null)}

        className={clsx(
          'w-6 h-6',
          value <= (hover || rating) ? `fill-${fillColor}` : `fill-${emptyColor}`
        )}
      />
    </button>
  );
};
