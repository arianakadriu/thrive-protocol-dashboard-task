import React, { useState } from "react";
import { ICharacter } from "../../types/ICharacter";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { IPagination } from "../../types/IPagination";
import { useTableContext } from "../../context/TableContext";
import TableRow from "../common/TableRow";

interface IProps {
  characters: ICharacter[];
  paginationData?: IPagination;
  fetchPageData: (page: number) => void;
  onSearchName: (query: string) => void;
  onSearchSpecies: (query: string) => void;
  onSearchStatus: (query: string) => void;
  onSearchGender: (query: string) => void;
}

const Table: React.FC<IProps> = ({
  characters,
  paginationData,
  fetchPageData,
  onSearchName,
  onSearchSpecies,
  onSearchStatus,
  onSearchGender,
}) => {
  const {
    // deleteRows,
    favoriteRowsAction,
    favoriteRows,
  } = useTableContext();

  const [selectedRows, setSelectedRows] = useState<boolean[]>(
    new Array(characters.length).fill(false)
  );

  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [disabledRows, setDisabledRows] = useState<number[]>([]);
  const speciesArray: string[] = [
    "alien",
    "humanoid",
    "human",
    "disease",
    "robot",
    "mythological creature",
    "animal",
    "cronenberg",
  ];
  const genderArray: string[] = ["male", "female", "genderless"];
  const statusArray: string[] = ["alive", "dead"];
  const navigate = useNavigate();

  const editCharacter = () => {
    navigate("/dashboard");
  };

  const deleteCharacter = (characterId?: number) => {
    let selectedCharacterIds: number[] = [];

    if (characterId) {
      selectedCharacterIds = [characterId];
    } else {
      selectedCharacterIds = characters
        .filter((_, index) => selectedRows[index])
        .map((character) => character.id);
    }

    if (selectedCharacterIds.length > 0) {
      setDisabledRows((prev) => {
        const updatedDisabledRows = [...prev];
        selectedCharacterIds.forEach((id) => {
          const index = updatedDisabledRows.indexOf(id);
          if (index === -1) {
            updatedDisabledRows.push(id);
          } else {
            updatedDisabledRows.splice(index, 1);
          }
        });
        return updatedDisabledRows;
      });

      setSelectedRows(new Array(characters.length).fill(false));
      setSelectAll(false);
    }
  };

  const favoriteCharacter = (characterId?: number) => {
    let selectedCharacterIds: number[] = [];

    if (characterId) {
      selectedCharacterIds = [characterId];
    } else {
      selectedCharacterIds = characters
        .filter((_, index) => selectedRows[index])
        .map((character) => character.id);
    }

    if (selectedCharacterIds.length > 0) {
      favoriteRowsAction(selectedCharacterIds);
      console.log("Selected favorite IDs:", selectedCharacterIds);
    } else {
      console.log("No characters selected for favorites");
    }
  };

  const isFavorite = (characterId: number) => {
    return favoriteRows.includes(characterId);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(Array(characters.length).fill(newSelectAll));
  };

  const handleRowSelect = (index: number) => {
    const updatedRows = [...selectedRows];
    updatedRows[index] = !updatedRows[index];
    setSelectedRows(updatedRows);

    const allSelected = updatedRows.every((row) => row);
    setSelectAll(allSelected);
  };

  const selectedCount = selectedRows.filter(Boolean).length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPageData(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    console.log("species", searchQuery);
    onSearchSpecies("");
    onSearchStatus("");
    onSearchGender("");
    onSearchName("");

    if (speciesArray.includes(searchQuery.toLowerCase())) {
      onSearchSpecies(searchQuery);
    } else if (statusArray.includes(searchQuery.toLowerCase())) {
      onSearchStatus(searchQuery);
    } else if (genderArray.includes(searchQuery.toLowerCase())) {
      onSearchGender(searchQuery);
    } else {
      onSearchName(searchQuery);
    }
  };

  const renderPaginationNumbers = () => {
    const pages = paginationData?.pages || 1;
    const pageNumbers: (number | string)[] = [];

    pageNumbers.push(1);

    if (currentPage !== 1 && currentPage !== pages) {
      pageNumbers.push(currentPage);
    }

    if (pages > 1) {
      pageNumbers.push(pages);
    }

    return pageNumbers.map((page, index) => (
      <li key={index} className="page-item">
        <button
          onClick={() => handlePageChange(Number(page))}
          className={`${
            currentPage === page
              ? "bg-sky-100 dark:bg-sky-800 text-sky-700 dark:text-sky-200"
              : ""
          } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white page-link ${
            page === currentPage ? "active" : ""
          }`}
        >
          {page}
        </button>
      </li>
    ));
  };

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    startIndex + itemsPerPage - 1,
    paginationData?.count || 0
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pr-6 py-4">
        <div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="bi bi-search"></i>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-100 rounded-lg w-[400px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by name, status, gender and species"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-0 px-4 py-2 text-sm text-white bg-gray-500 rounded-r-lg"
              aria-label="Submit Search"
            >
              Submit
            </button>
          </div>
        </div>

        {selectedCount > 1 && (
          <div className="flex gap-4 justify-center mt-2 sm:mt-0">
            <i
              className="bi bi-heart text-lg cursor-pointer text-red-600"
              onClick={() => favoriteCharacter()}
            ></i>
            <i
              className="bi bi-trash text-lg cursor-pointer text-gray-700"
              onClick={() => deleteCharacter()}
            ></i>
          </div>
        )}
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-sky-900 bg-gray-100 border-gray-300 rounded focus:ring-sky-950 dark:focus:ring-sky-950 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    Select All
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Species
              </th>
              <th scope="col" className="px-6 py-3">
                Origin
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                No Episodes
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {characters.length > 0 ? (
              characters.map((character, index) => (
                <TableRow
                  key={character.id}
                  character={character}
                  index={index}
                  disabledRows={disabledRows}
                  selectedRows={selectedRows}
                  handleRowSelect={handleRowSelect}
                  isFavorite={isFavorite}
                  favoriteCharacter={favoriteCharacter}
                  editCharacter={editCharacter}
                  deleteCharacter={deleteCharacter}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center px-6 py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav
          className="flex items-center px-6 py-4 flex-column flex-wrap md:flex-row justify-center sm:justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex}-{endIndex}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {paginationData?.count}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                disabled={!(paginationData && paginationData.prev)}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  !(paginationData && paginationData.prev)
                    ? "cursor-not-allowed text-gray-400 bg-gray-100 dark:bg-gray-100 dark:text-gray-300"
                    : ""
                }`}
              >
                Previous
              </button>
            </li>
            {renderPaginationNumbers()}
            <li>
              <button
                disabled={!(paginationData && paginationData.next)}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  !(paginationData && paginationData.next)
                    ? "cursor-not-allowed text-gray-400 bg-gray-100 dark:bg-gray-100 dark:text-gray-300"
                    : ""
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Table;
