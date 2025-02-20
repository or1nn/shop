import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from './redux';

export const useFilters = () => {
  const location = useLocation();
  const filter = location.pathname.split('/')[1];
  const search = useAppSelector((state) => state.filter.search);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(0);
  const [order, setOrder] = useState('desc');
  return { filter, search, page, sort, order, setPage, setSort, setOrder };
};
