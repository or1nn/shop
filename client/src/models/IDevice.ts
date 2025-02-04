import { IReview } from "./IReview";

export interface IDevice {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isFavorite?: boolean
  reviews: IReview[]
}
