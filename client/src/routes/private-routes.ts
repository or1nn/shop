import {
  CART_ROUTE,
  FAVORITES_ROUTE,
  PROFILE_ROUTE,
} from '../constants/route-paths';
import Cart from '../pages/cart';
import Favorites from '../pages/favorites';
import Profile from '../pages/profile';

export const authRoutes = [
  { path: PROFILE_ROUTE, component: Profile },
  { path: CART_ROUTE, component: Cart },
  { path: FAVORITES_ROUTE, component: Favorites },
];
