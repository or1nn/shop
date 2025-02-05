import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import DevicePage from '../pages/DevicePage';
import Favorites from '../pages/Favorites';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SearchPage from '../pages/SearchPage';
import {
  AUTH_ROUTE,
  CART_ROUTE,
  DEVICE_ROUTE,
  FAVORITES_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
  SEARCH_BRAND_ROUTE,
  SEARCH_CATEGORY_ROUTE,
} from './constants';

export const publicRoutes = [
  { path: HOME_ROUTE, component: Home },
  { path: CART_ROUTE, component: Cart },
  { path: AUTH_ROUTE, component: Auth },
  { path: DEVICE_ROUTE, component: DevicePage },
  { path: SEARCH_CATEGORY_ROUTE, component: SearchPage },
  { path: SEARCH_BRAND_ROUTE, component: SearchPage },
];

export const authRoutes = [
  { path: PROFILE_ROUTE, component: Profile },
  { path: CART_ROUTE, component: Cart },
  { path: FAVORITES_ROUTE, component: Favorites },
];
