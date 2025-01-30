import { AiOutlineSearch } from "react-icons/ai";

export const Search = () => {
  return (
    <div className="">
      <form className="flex outline-1 rounded-md outline-[#c5c5c5] w-100 justify-between">
        <input
          type="text"
          placeholder="Поиск"
          className="px-4 py-2 w-full rounded-l-md"
        />
        <button className="bg-blue-500 p-2 rounded-r-md cursor-pointer">
          <span>
            <AiOutlineSearch fill="white" className="h-8 w-8" />
          </span>
        </button>
      </form>
    </div>
  );
};
