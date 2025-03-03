const Pagination = ({ books, currentPage, setCurrentPage, booksPerPage }) => {
  const totalPages = Math.ceil(books.length / booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center items-center mt-6 gap-4">
      <button
        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-white text-black border border-orange cursor-not-allowed" : "bg-yellow text-black"}`}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="text-black text-lg font-bold">{currentPage} / {totalPages}</span>

      <button
        className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-white text-black border border-orange cursor-not-allowed" : "bg-yellow text-black"}`}
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
