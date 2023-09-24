import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPagesToShow = 5,
}) => {
  const pageNumbers = [];

  // Display up to 5 pages at a time, centered around the current page
  const middleIndex = Math.floor(maxPagesToShow / 2);
  const startPage =
    currentPage <= middleIndex
      ? 1
      : Math.min(currentPage - middleIndex, totalPages - maxPagesToShow + 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  // Generate the page numbers to display
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        title="First Page"
      >
        {"<<"}
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        title="Previous Page"
      >
        {"<"}
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {endPage < totalPages && <span className="ellipsis">...</span>}
      {endPage < totalPages && (
        <button onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        title="Next Page"
      >
        {">"}
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        title="Last Page"
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
