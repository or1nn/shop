import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './hooks/redux';
import { useEffect } from 'react';
import { setUser } from './store/user/slice';
import { useCurrentUserQuery } from './services/userApi';
import AppRouter from './components/AppRouter';

function App() {
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useCurrentUserQuery('');
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    }
  }, [isSuccess]);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
