import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // محاسبه صفحات قابل نمایش (حداکثر 5 صفحه)
  const getDisplayedPages = () => {
    if (totalPages <= 5) return pages;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    return pages.slice(start - 1, end);
  };

  const displayedPages = getDisplayedPages();

  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-28" dir="ltr">
      {/* دکمه قبلی */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-gray-900"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* نمایش اولین صفحه اگر در محدوده نمایش نباشد */}
      {displayedPages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:text-gray-900 outline outline-1 outline-gray-300"
          >
            1
          </button>
          {displayedPages[0] > 2 && <span className="text-gray-500">...</span>}
        </>
      )}

      {/* شماره صفحات */}
      {displayedPages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center outline outline-1 ${
            currentPage === page
              ? "text-blue-500 outline-blue-500 shadow-md shadow-blue-500"
              : "text-gray-700 hover:text-gray-900 outline-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* نمایش آخرین صفحه اگر در محدوده نمایش نباشد */}
      {displayedPages[displayedPages.length - 1] < totalPages && (
        <>
          {displayedPages[displayedPages.length - 1] < totalPages - 1 && (
            <span className="text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 hover:text-gray-900 outline outline-1 outline-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* دکمه بعدی */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-gray-900"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
