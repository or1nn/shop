import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import { useAppDispatch } from './hooks/redux';
import { useEffect } from 'react';
import { setUser } from './store/user/slice';
import Profile from './pages/Profile';
import { useCurrentUserQuery } from './services/authApi';

function App() {
  const dispatch = useAppDispatch();
  const { token } = JSON.parse(localStorage.getItem('user') || '{}');
  // console.log(token)
  const { data, isSuccess } = useCurrentUserQuery(token);
  const onLoad = async () => {
    // await currentUser({ token });
  };
  useEffect(() => {
    onLoad();
    if (isSuccess) {
      dispatch(setUser(data));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
