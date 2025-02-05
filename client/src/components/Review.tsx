import { useAppSelector } from '../hooks/redux';
import { IReview } from '../models/IReview';
import { useDeleteReviewMutation } from '../services/reviewApi';
import { BASE_URL } from '../utils/constants';
import { formatDate } from '../utils/formatDate';
import { StarRating } from './ui/StarRating';
import { AiOutlineDelete } from 'react-icons/ai';

interface ReviewProps {
  review: IReview;
}

export const Review: React.FC<ReviewProps> = ({ review }) => {
  const [deleteReview] = useDeleteReviewMutation();
  const onClickDeleteHandler = async () => {
    await deleteReview({ deviceId: review.deviceId });
  };
  const userId = useAppSelector((state) => state.user.current?.id);
  return (
    <div className="py-4 mb-2 w-300 relative">
      {userId === review.userId && (
        <button className="cursor-pointer" onClick={onClickDeleteHandler}>
          <AiOutlineDelete className="absolute top-4 right-2 w-7 h-7 fill-gray-500 hover:fill-red-500" />
        </button>
      )}
      <div className="grid grid-cols-[80px_200px] items-center grid-rows-2 mb-2">
        <div className="w-15 row-start-1 row-end-3">
          <img
            src={`${BASE_URL}/uploads/avatars/${review.user.avatar}`}
            alt="avatar"
            className="rounded-full h-15 w-full object-cover"
          />
        </div>
        <div>
          {review.user.name} {review.user.surname}
        </div>
        <div className="text-gray-500">{formatDate(review.updatedAt)}</div>
      </div>
      <div className="mb-2">{review.body}</div>
      <StarRating defaultState={review.rate} maxValue={5} readOnly={true} />
    </div>
  );
};
