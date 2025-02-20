import {
  AUTH_ROUTE,
  CART_ROUTE,
  DEVICE_ROUTE,
  HOME_ROUTE,
  SEARCH_BRAND_ROUTE,
  SEARCH_CATEGORY_ROUTE,
} from '../constants/route-paths';
import Auth from '../pages/auth';
import Cart from '../pages/cart';
import DevicePage from '../pages/device-page';
import Home from '../pages/home';
import SearchPage from '../pages/search-page';

export const publicRoutes = [
  { path: HOME_ROUTE, component: Home },
  { path: CART_ROUTE, component: Cart },
  { path: AUTH_ROUTE, component: Auth },
  { path: DEVICE_ROUTE, component: DevicePage },
  { path: SEARCH_CATEGORY_ROUTE, component: SearchPage },
  { path: SEARCH_BRAND_ROUTE, component: SearchPage },
];
