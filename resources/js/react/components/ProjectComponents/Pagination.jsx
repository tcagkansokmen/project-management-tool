import React from 'react';

const Pagination = ({ currentPage, lastPage, handlePreviousPage, handleNextPage }) => {
    return (
        <div className="flex justify-between mt-4">
            <button
                className={`px-4 text-white/50 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="text-white">Page {currentPage} of {lastPage}</span>
            <button
                className={`px-4 text-white/50 py-2 rounded-lg ${currentPage === lastPage ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={handleNextPage}
                disabled={currentPage === lastPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
