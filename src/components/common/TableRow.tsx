import React from "react";
import { ICharacter } from "../../types/ICharacter";

interface IProps {
  character: ICharacter;
  index: number;
  disabledRows: number[];
  selectedRows: boolean[];
  handleRowSelect: (index: number) => void;
  isFavorite: (id: number) => boolean;
  favoriteCharacter: (id: number) => void;
  editCharacter: (id: number) => void;
  deleteCharacter: (id: number) => void;
}

const TableRow: React.FC<IProps> = ({
  character,
  index,
  disabledRows,
  selectedRows,
  handleRowSelect,
  isFavorite,
  favoriteCharacter,
  editCharacter,
  deleteCharacter,
}) => {
  return (
    <tr
      key={character.id}
      style={{
        opacity: disabledRows.includes(character.id) ? 0.5 : 1,
      }}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-table-search-${index}`}
            type="checkbox"
            checked={selectedRows[index] || false}
            onChange={() => handleRowSelect(index)}
            className="w-4 h-4 text-sky-900 bg-gray-100 border-gray-300 rounded focus:ring-sky-950 dark:focus:ring-sky-950 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
            Select Row
          </label>
        </div>
      </td>
      <td
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-wrap dark:text-white"
      >
        <img
          className="w-10 h-10 rounded-full"
          src={character.image}
          alt={character.name}
        />
        <div className="pl-3">
        <div className="text-base font-semibold break-words">{character.name}</div>
        <div className="font-normal text-gray-500">{character.gender}</div>
        </div>
      </td>
      <td className="px-6 py-4">{character.status}</td>
      <td className="px-6 py-4">{character.species}</td>
      <td className="px-6 py-4">
        {character.origin.name !== "unknown" ? character.origin.name : "-"}
      </td>
      <td className="px-6 py-4">
        {character.location.name !== "unknown" ? character.location.name : "-"}
      </td>
      <td className="px-6 py-4">{character.episode.length}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <i
            className={`bi ${
              isFavorite(character.id) ? "bi-heart-fill" : "bi-heart"
            } text-lg cursor-pointer text-red-600`}
            onClick={() => favoriteCharacter(character.id)}
          ></i>
          <i
            className="bi bi-pencil text-lg cursor-pointer text-gray-700"
            onClick={() => editCharacter(character.id)}
          ></i>
          <i
            className="bi bi-trash text-lg cursor-pointer text-gray-700"
            onClick={() => deleteCharacter(character.id)}
          ></i>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
