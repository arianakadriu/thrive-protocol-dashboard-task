import React from "react";

interface IProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}

const Search: React.FC<IProps> = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <i className="bi bi-search"></i>
      </div>
      <input
        type="text"
        id="table-search"
        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-100 rounded-lg w-[400px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Name, status, gender or species"
        value={searchQuery}
        onChange={onSearchChange}
      />
      <button
        onClick={onSearchSubmit}
        className="absolute right-0 px-4 py-2 text-sm text-white bg-sky-900 rounded-r-lg"
        aria-label="Submit Search"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
