import { AiFillStar } from "react-icons/ai";
import { Review } from "./Review";

export const ReviewContainer = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-[1000px_200px] grid-rows-[20px_80px] items-center mb-4 gap-y-2">
        <div className="text-2xl font-medium mb-2 col-start-1 col-end-3">
          Отзывы
        </div>
        <div className="flex h-full">
          <textarea
            name=""
            id=""
            className="outline-1 outline-gray-500/50 w-full h-20 rounded-l-md px-4 py-2"
            placeholder="Оставьте отзыв..."
          ></textarea>
          <button className="bg-blue-500 text-white py-4 w-60 rounded-r-xl font-medium mb-2 cursor-pointer h-full">
            Оставить отзыв
          </button>
        </div>
        <div className="flex ml-2">
          <AiFillStar className="w-8 h-8 fill-gray-300" />
          <AiFillStar className="w-8 h-8 fill-gray-300" />
          <AiFillStar className="w-8 h-8 fill-gray-300" />
          <AiFillStar className="w-8 h-8 fill-gray-300" />
          <AiFillStar className="w-8 h-8 fill-gray-300" />
        </div>
      </div>
      <Review />
      <Review />
      <Review />
      <Review />
    </div>
  );
};
