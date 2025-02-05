import { IBrand } from "./IBrand";
import { ICategory } from "./ICategory";
import { IInfo } from "./IInfo";
import { IReview } from "./IReview";

export interface IDevice {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isFavorite?: boolean
  brand?: IBrand
  category?: ICategory
  info?: IInfo[]
  reviews: IReview[]
}
