import { AiOutlineSearch } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { ChangeEvent, FormEvent, useState } from 'react';
import { setSearch } from '../store/filterSlice';
import { AiOutlineClose } from 'react-icons/ai';

export const Search = () => {
  const dispatch = useAppDispatch();
  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(value));
  };
  const onDeleteHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(''));
    setValue('');
  };
  const [value, setValue] = useState('');
  return (
    <div className="">
      <form
      onSubmit={onSubmitHandler}
        className="flex outline-1 rounded-md outline-[#c5c5c5] w-100 justify-between relative"
      >
        <input
          type="text"
          value={value}
          onChange={onChangeSearchHandler}
          placeholder="Поиск"
          className="px-4 py-2 w-full rounded-l-md pr-8"
        />
        {value !== '' && (
          <button
            onClick={onDeleteHandler}
            type="reset"
            className="cursor-pointer absolute right-14 top-3"
          >
            <AiOutlineClose className="w-5 h-5 fill-gray-500" />
          </button>
        )}
        <button type="submit" className="bg-blue-500 p-2 rounded-r-md cursor-pointer">
          <span>
            <AiOutlineSearch fill="white" className="h-8 w-8" />
          </span>
        </button>
      </form>
    </div>
  );
};
