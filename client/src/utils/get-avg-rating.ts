import { IReview } from '../models/IReview';

export const getAvgRating = (reviews: IReview[]) => {
  if (reviews.length === 0) {
    return 0;
  }
  return reviews.reduce((acc, item) => item.rate + acc, 0) / reviews.length;
};
