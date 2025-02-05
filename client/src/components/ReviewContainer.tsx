import { toast } from 'react-toastify';
import { IReview } from '../models/IReview';
import { useAddReviewMutation } from '../services/reviewApi';
import { Review } from './Review';
import { StarRating } from './ui/StarRating';
import { ChangeEvent, useState } from 'react';

interface ReviewContainerProps {
  reviews: IReview[];
  deviceId: number;
}

export const ReviewContainer: React.FC<ReviewContainerProps> = ({
  reviews,
  deviceId,
}) => {
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState('');
  const [addReview] = useAddReviewMutation();
  const onAddReview = async () => {
    try {
      await addReview({ content, rate, deviceId }).unwrap();
      setContent('');
      setRate(0);
    } catch (error) {
      toast.error((error as any).data.message);
    }
  };
  return (
    <div className="flex flex-col mt-20">
      <div className="grid grid-cols-[1000px_200px] grid-rows-[20px_80px] items-center mb-4 gap-y-2">
        <div className="text-2xl font-medium mb-2 col-start-1 col-end-3">
          Отзывы
        </div>
        <div className="flex h-full">
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            className="outline-1 outline-gray-500/50 w-full h-20 rounded-l-md px-4 py-2"
            placeholder="Оставьте отзыв..."
          ></textarea>
          <button
            onClick={onAddReview}
            className="bg-blue-500 text-white py-4 w-60 rounded-r-xl font-medium mb-2 cursor-pointer h-full"
          >
            Оставить отзыв
          </button>
        </div>
        <div className="flex ml-2">
          <StarRating
            defaultState={rate}
            maxValue={5}
            onChangeValue={(value) => setRate(value)}
          />
        </div>
      </div>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};
