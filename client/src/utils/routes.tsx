import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import DevicePage from '../pages/DevicePage';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { AUTH_ROUTE, CART_ROUTE, DEVICE_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from './constants';

export const publicRoutes = [
  { path: HOME_ROUTE, component: Home },
  { path: CART_ROUTE, component: Cart },
  { path: AUTH_ROUTE, component: Auth },
  { path: DEVICE_ROUTE, component: DevicePage },
];

export const authRoutes = [
  { path: PROFILE_ROUTE, component: Profile },
  { path: CART_ROUTE, component: Cart },
];
