import React from "react";
import Button from "../common/Button";

interface IProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const ItemsPagination: React.FC<IProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <Button
        title="Previous"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        className={`px-4 py-2 text-white bg-sky-800 rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-sky-900"
        }`}
      />
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        title="Next"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        className={`px-4 py-2 text-white bg-sky-800 rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-sky-900"
        }`}
      />
    </div>
  );
};

export default ItemsPagination;
