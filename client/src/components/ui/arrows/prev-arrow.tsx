import { BiLeftArrowAlt } from 'react-icons/bi';

export const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="cursor-pointer absolute -left-10 top-30"
    >
      <BiLeftArrowAlt className="w-10 h-10 fill-gray-400 hover:fill-blue-500" />
    </button>
  );
};
