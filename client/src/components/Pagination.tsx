import ReactPaginate from 'react-paginate';

interface PaginationProps {
  onChangePage: (e: any) => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
  totalPages,
}) => {
  return (
    <>
      <ReactPaginate
        className="flex items-center justify-end mb-4"
        previousLinkClassName="mr-2 cursor-pointer text-gray-500 hover:text-blue-500"
        nextLinkClassName="cursor-pointer text-gray-500 hover:text-blue-500"
        pageLinkClassName="flex justify-center items-center text-white cursor-pointer rounded-full w-7 h-7 mr-2 bg-gray-500"
        activeLinkClassName="bg-blue-500"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
