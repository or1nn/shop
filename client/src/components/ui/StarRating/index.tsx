import { createContext, useEffect, useState } from 'react';
import { StarList } from './StarList';

interface StarRatingProps {
  defaultState: number;
  readOnly?: boolean;
  emptyColor?: string;
  fillColor?: string;
  maxValue: number;
  onChangeHover?: (value: any) => void;
  onChangeValue?: (value: any) => void;
}
export const StarRatingContext = createContext({
  readOnly: false,
  maxValue: 5,
  hover: null,
  emptyColor: 'gray-500',
  fillColor: 'yellow-500',
  rating: 0,
  setRating: (_: any) => {},
  setHover: (_: any) => {},
});

export const StarRating: React.FC<StarRatingProps> = ({
  defaultState,
  maxValue,
  emptyColor = 'gray-300',
  fillColor = 'yellow-300',
  onChangeValue,
  onChangeHover,
  readOnly = false,
}) => {
  const [rating, setRating] = useState(defaultState);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    setRating(defaultState);
  }, [defaultState]);
  const setRatingFn = (value: any) => {
    if (readOnly) return;
    setRating(value);
    if (onChangeValue) {
      onChangeValue(value);
    }
  };
  const setHoverFn = (value: any) => {
    if (readOnly) return;
    setHover(value);
    if (onChangeHover) {
      onChangeHover(value);
    }
  };
  return (
    <StarRatingContext.Provider
      value={{
        emptyColor,
        fillColor,
        rating,
        hover,
        maxValue,
        setRating: setRatingFn,
        setHover: setHoverFn,
        readOnly,
      }}
    >
      <StarList />
    </StarRatingContext.Provider>
  );
};
