import { AiOutlineSwap } from 'react-icons/ai';
import { Button } from './ui/Button';

interface SortProps {
  sort: number;
  order: string;
  setSort: (i: number) => void;
  setOrder: (order: string) => void;
}

const sortTypes = [
  'По популярности',
  'По цене',
  'По рейтингу',
  'По отзывам',
  'По названию',
];

export const Sort: React.FC<SortProps> = ({
  sort,
  setSort,
  setOrder,
  order,
}) => {
  const toggleOrder = () => {
    if (order === 'desc') {
      setOrder('asc');
    } else {
      setOrder('desc');
    }
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        {sortTypes.map((name, i) => (
          <div
            key={i}
            onClick={() => setSort(i)}
            className={`mr-2 cursor-pointer ${sort === i ? 'font-medium' : ''}`}
          >
            {name}
          </div>
        ))}
      </div>
      <Button onClick={toggleOrder} variant="subtle" className=" rounded-xl">
        <AiOutlineSwap className="mr-2" />
        {order === 'desc' ? 'По убыванию' : 'По возрастанию'}
      </Button>
    </div>
  );
};
