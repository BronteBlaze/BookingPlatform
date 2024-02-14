import React from "react";

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  const prevChangeHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextChangeHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex items-center">
      <button
        className="mx-1 text-sm font-semibold text-gray-900"
        onClick={prevChangeHandler}
        disabled={currentPage === 1}
      >
        &larr; Previous
      </button>
      <button
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 hover:bg-fuchsia-300 hover:border-fuchsia-300"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        1
      </button>
      <button
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 hover:bg-fuchsia-300 hover:border-fuchsia-300"
        onClick={() => setCurrentPage(2)}
        disabled={currentPage === 2 || totalPages === 1}
      >
        2
      </button>
      <button
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 hover:bg-fuchsia-300 hover:border-fuchsia-300"
        onClick={() => setCurrentPage(3)}
        disabled={currentPage === 3 || totalPages < 3}
      >
        3
      </button>
      <button
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105 hover:bg-fuchsia-300 hover:border-fuchsia-300"
        onClick={() => setCurrentPage(4)}
        disabled={currentPage === 4 || totalPages < 4}
      >
        4
      </button>
      <button
        className="mx-2 text-sm font-semibold text-gray-900"
        onClick={nextChangeHandler}
        disabled={currentPage === totalPages}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
