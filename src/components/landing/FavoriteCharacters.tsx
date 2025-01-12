import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { getMultipleCharacters } from "../../services/characters";
import { ICharacter } from "../../types/ICharacter";
import FavoriteCharacter from "./FavoriteCharacter";

const FavoriteCharacters: React.FC = () => {
  const { favoriteRows } = useCharacterContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<ICharacter[] | null>(null);

  useEffect(() => {
    if (favoriteRows && favoriteRows.length > 0) {
      setLoading(true);
      const getFavoriteCharacters = async () => {
        try {
          const characterData = await getMultipleCharacters(favoriteRows);

          setCharacters(characterData);
        } catch (error) {
          setError(`Failed to load Characters: ${error}`);
        } finally {
          setLoading(false);
        }
      };

      getFavoriteCharacters();
    }
  }, [favoriteRows]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 my-8">Favorite Characters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters && characters.length > 0 && (
        characters.map((character) => (
          <FavoriteCharacter key={character.id} character={character}/>
        ))
      )}
      </div>
    </>
  );
};

export default FavoriteCharacters;
