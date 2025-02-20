interface SearchEmptyProps {
  searchValue: string;
}

export const SearchEmpty: React.FC<SearchEmptyProps> = ({ searchValue }) => {
  return (
    <div className="text-center text-xl">
      По Вашему запросу «{searchValue}» ничего не найдено.
    </div>
  );
};
