import { BiRightArrowAlt } from 'react-icons/bi';

export const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="cursor-pointer absolute -right-10 top-30"
    >
      <BiRightArrowAlt className="w-10 h-10 fill-gray-400 hover:fill-blue-500" />
    </button>
  );
};
