import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { getMultipleCharacters } from "../../services/characters";
import { ICharacter } from "../../types/ICharacter";
import FavoriteCharacter from "./FavoriteCharacter";
import ErrorText from "../common/ErrorText";
import LoadingSpinner from "../common/LoadingSpinner";
import ItemsPagination from "../common/ItemsPagination";

const FavoriteCharacters: React.FC = () => {
  const { favoriteRows } = useCharacterContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (favoriteRows && favoriteRows.length > 0) {
      setLoading(true);
      const getFavoriteCharacters = async () => {
        try {
          const characterData = await getMultipleCharacters(favoriteRows);
          const formatedData = Array.isArray(characterData) ? characterData : [characterData]
          setCharacters(formatedData);
        } catch (error) {
          setError(`Failed to load Characters: ${error}`);
        } finally {
          setLoading(false);
        }
      };

      getFavoriteCharacters();
    } else {
      setCharacters(null);
    }
  }, [favoriteRows]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCharacters = characters
    ? characters.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = characters
    ? Math.ceil(characters.length / itemsPerPage)
    : 0;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 my-8">
        Favorite Characters
      </h2>
      {error ? (
        <ErrorText error={error} />
      ) : characters && characters.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentCharacters.map((character) => (
              <FavoriteCharacter key={character.id} character={character} />
            ))}
          </div>
          <ItemsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-40 text-center text-gray-600">
          No favorite characters found. Go to the dashboard and add some!
        </div>
      )}
    </>
  );
};

export default FavoriteCharacters;
