import React, { useCallback, useState } from "react";
import { ICharacter } from "../../types/ICharacter";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { IPagination } from "../../types/IPagination";
import TableRow from "../common/TableRow";
import { useCharacterContext } from "../../context/CharacterContext";
import Modal from "../common/Modal";
import Search from "../common/Search";
import TableHeader from "../common/TableHeader";

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
  const { favoriteRowsAction, favoriteRows } = useCharacterContext();

  const [selectedRows, setSelectedRows] = useState<boolean[]>(
    new Array(characters.length).fill(false)
  );

  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);
  const [isMultiFavoriteModalOpen, setIsMultiFavoriteModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMultiDeleteModalOpen, setIsMultiDeleteModalOpen] = useState(false);
  const [characterToFavorite, setCharacterToFavorite] = useState<number | null>(
    null
  );
  const [characterToDelete, setCharacterToDelete] = useState<number | null>(
    null
  );
  const [disabledRows, setDisabledRows] = useState<number[]>([]);

  // Arrays of grouped categories about species, gender and status
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

  // Table Sort
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
    setCharacterToDelete(characterId ? characterId : null);
    if (characterId) {
      setIsDeleteModalOpen(true);
    } else {
      setIsMultiDeleteModalOpen(true);
    }
  };

  const onDeleteModalCancel = () => {
    setCharacterToDelete(null);
    setIsDeleteModalOpen(false);
    setIsMultiDeleteModalOpen(false);
  };

  const onDeleteModalConfirm = () => {
    let selectedCharacterIds: number[] = [];

    if (characterToDelete) {
      selectedCharacterIds = [characterToDelete];
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

    if (characterToDelete) {
      setIsDeleteModalOpen(false);
    } else {
      setIsMultiDeleteModalOpen(false);
    }
  };

  const favoriteCharacter = (characterId?: number) => {
    setCharacterToFavorite(characterId ? characterId : null);
    if (characterId) {
      setIsFavoriteModalOpen(true);
    } else {
      setIsMultiFavoriteModalOpen(true);
    }
  };

  const isFavorite = (characterId: number) => {
    return favoriteRows.includes(characterId);
  };

  // Modal title
  const getFavoriteModalTitle = () => {
    if (characterToFavorite && isFavorite(characterToFavorite)) {
      return "Unfavorite";
    }
    return "Favorite";
  };

  const getMultiFavoriteModalTitle = () => {
    const selectedCharacterIds = characters
      .filter((_, index) => selectedRows[index])
      .map((character) => character.id);

    const allSelectedFavorited = selectedCharacterIds.every((id) =>
      isFavorite(id)
    );

    if (allSelectedFavorited) {
      return "Unfavorite";
    }
    return "Favorite";
  };

  const getDeleteModalTitle = () => {
    if (
      characterToDelete !== null &&
      disabledRows.includes(characterToDelete)
    ) {
      return { action: "Undo", effect: "enable" };
    }
    return { action: "Delete", effect: "disable" };
  };

  const getMultiDeleteModalTitle = () => {
    const selectedCharacterIds = characters
      .filter((_, index) => selectedRows[index])
      .map((character) => character.id);

    const allSelectedInDelete = selectedCharacterIds.every((id) =>
      disabledRows.includes(id)
    );

    if (allSelectedInDelete) {
      return { action: "Undo", effect: "enable" };
    }
    return { action: "Delete", effect: "disable" };
  };

  const onFavoriteModalCancel = () => {
    setCharacterToFavorite(null);
    setIsFavoriteModalOpen(false);
    setIsMultiFavoriteModalOpen(false);
  };

  const onFavoriteModalConfirm = () => {
    let selectedCharacterIds: number[] = [];

    if (characterToFavorite) {
      selectedCharacterIds = [characterToFavorite];
    } else {
      selectedCharacterIds = characters
        .filter((_, index) => selectedRows[index])
        .map((character) => character.id);
    }

    if (selectedCharacterIds.length > 0) {
      favoriteRowsAction(selectedCharacterIds);
    }

    if (characterToFavorite) {
      setIsFavoriteModalOpen(false);
    } else {
      setIsMultiFavoriteModalOpen(false);
    }
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

  // Pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPageData(page);
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
        <Search
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />

        {selectedCount > 1 && (
          <div className="flex space-x-2 justify-center mt-2 sm:mt-0 sm:mr-6">
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
              <TableHeader
                column="name"
                label="Full Name"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                column="status"
                label="Status"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                className="w-32"
              />
              <TableHeader
                column="species"
                label="Species"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                className="w-32"
              />
              <TableHeader
                column="origin.name"
                label="Origin"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                column="location.name"
                label="Location"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
              <TableHeader
                column="episode.length"
                label="No Episodes"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                className="w-48"
              />
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
        <Modal
          isOpen={isFavoriteModalOpen}
          title={`${getFavoriteModalTitle()} Character`}
          description={`Are you sure you want to ${getFavoriteModalTitle().toLowerCase()} this character?`}
          onClose={onFavoriteModalCancel}
          onConfirm={onFavoriteModalConfirm}
        />
        <Modal
          isOpen={isMultiFavoriteModalOpen}
          title={`${getMultiFavoriteModalTitle()} Characters`}
          description={`Are you sure you want to ${getMultiFavoriteModalTitle().toLowerCase()} these characters?`}
          onClose={onFavoriteModalCancel}
          onConfirm={onFavoriteModalConfirm}
        />
        <Modal
          isOpen={isDeleteModalOpen}
          title={`${getDeleteModalTitle().action} Character`}
          description={`Are you sure you want to ${getDeleteModalTitle().action.toLowerCase()} this character? This action will ${
            getDeleteModalTitle().effect
          }  the row.`}
          onClose={onDeleteModalCancel}
          onConfirm={onDeleteModalConfirm}
        />
        <Modal
          isOpen={isMultiDeleteModalOpen}
          title={`${getMultiDeleteModalTitle().action} Characters`}
          description={`Are you sure you want to ${getMultiDeleteModalTitle().action.toLowerCase()} these characters? This action will ${
            getMultiDeleteModalTitle().effect
          } the row.`}
          onClose={onDeleteModalCancel}
          onConfirm={onDeleteModalConfirm}
        />
      </div>
    </>
  );
};

export default Table;
