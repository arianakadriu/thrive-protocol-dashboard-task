import React, { useCallback, useState } from "react";
import { ICharacter } from "../../types/ICharacter";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { IPagination } from "../../types/IPagination";
import TableRow from "../common/TableRow";
import { useCharacterContext } from "../../context/CharacterContext";

interface IProps {
  characters: ICharacter[];
  paginationData?: IPagination;
  fetchPageData: (page: number) => void;
  onSearchName: (query: string) => void;
  onSearchSpecies: (query: string) => void;
  onSearchStatus: (query: string) => void;
  onSearchGender: (query: string) => void;
}

type SortDirection = "asc" | "desc";

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
  } = useCharacterContext();

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

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = getValue(a, sortColumn);
    const bValue = getValue(b, sortColumn);
    console.log(
      "ep",
      aValue,
      bValue,
      (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) *
        (sortDirection === "asc" ? 1 : -1)
    );

    // Handle undefined values by placing them at the end or beginning depending on the sort direction
    if (aValue === undefined) return sortDirection === "asc" ? 1 : -1;
    if (bValue === undefined) return sortDirection === "asc" ? -1 : 1;

    return (
      (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) *
      (sortDirection === "asc" ? 1 : -1)
    );
  });

  const editCharacter = (id: number) => {
    navigate(`/details/${id}`);
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

  const handleSearchSubmit = useCallback(() => {
    const query = searchQuery.trim().toLowerCase();

    onSearchSpecies("");
    onSearchStatus("");
    onSearchGender("");
    onSearchName("");

    if (speciesArray.includes(query)) {
      onSearchSpecies(query);
    } else if (statusArray.includes(query)) {
      onSearchStatus(query);
    } else if (genderArray.includes(query)) {
      onSearchGender(query);
    } else {
      onSearchName(query);
    }
  }, [
    searchQuery,
    onSearchName,
    onSearchSpecies,
    onSearchStatus,
    onSearchGender,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4">
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
              placeholder="Name, status, gender or species"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-0 px-4 py-2 text-sm text-white bg-sky-900 rounded-r-lg"
              aria-label="Submit Search"
            >
              Search
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
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex">
                  Full Name
                  {sortColumn === "name" && (
                    <i
                      className={`bi bi-arrow-${
                        sortDirection === "asc" ? "up" : "down"
                      } ms-2`}
                    ></i>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer w-32"
                onClick={() => handleSort("status")}
              >
                <div className="flex">
                  Status
                  {sortColumn === "status" && (
                    <i
                      className={`bi bi-arrow-${
                        sortDirection === "asc" ? "up" : "down"
                      } ms-2`}
                    ></i>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer w-32"
                onClick={() => handleSort("species")}
              >
                <div className="flex">
                  Species
                  {sortColumn === "species" && (
                    <i
                      className={`bi bi-arrow-${
                        sortDirection === "asc" ? "up" : "down"
                      } ms-2`}
                    ></i>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("origin.name")}
              >
                <div className="flex items-center">
                  Origin
                  {sortColumn === "origin.name" && (
                    <i
                      className={`bi bi-arrow-${
                        sortDirection === "asc" ? "up" : "down"
                      } ms-2`}
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleSort("location.name")}
              >
                <div className="flex items-center">
                  Location
                  {sortColumn === "location.name" && (
                    <i
                      className={`bi bi-arrow-${
                        sortDirection === "asc" ? "up" : "down"
                      } ms-2`}
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 "
                onClick={() => handleSort("episode.length")}
              >
                <div className="flex items-center">
                  No Episodes
                  {sortColumn === "episode.length" && (
                    <i
                      className={`bi bi-arrow-${
                        sortDirection === "asc" ? "up" : "down"
                      } ms-2`}
                    />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCharacters.length > 0 ? (
              sortedCharacters.map((character, index) => (
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
