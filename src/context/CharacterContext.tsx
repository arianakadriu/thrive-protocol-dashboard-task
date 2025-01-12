import React, { createContext, useContext, useState, ReactNode } from "react";
import { ICharacter } from "../types/ICharacter"; // Ensure you have the correct type for ICharacter

interface CharacterContextType {
  characters: ICharacter[];
  setCharacters: (characters: ICharacter[]) => void;
  favoriteRows: number[];
  deleteRows: (ids: number[]) => void;
  favoriteRowsAction: (ids: number[]) => void;
  profile: ICharacter;
  updateProfile: (profile: ICharacter) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }
  return context;
};

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [favoriteRows, setFavoriteRows] = useState<number[]>([]); // Track favorite rows
  const [profile, setProfile] = useState<ICharacter>({} as ICharacter);

  const updateProfile = (updatedProfile: ICharacter) => {
    setProfile(updatedProfile);
  };

  const deleteRows = (ids: number[]) => {
    setCharacters((prev) => prev.filter((character) => !ids.includes(character.id)));
  };

  const favoriteRowsAction = (ids: number[]) => {
    setFavoriteRows((prev) => {
      const updatedFavorites = new Set(prev);
      ids.forEach((id) => {
        if (updatedFavorites.has(id)) {
          updatedFavorites.delete(id);
        } else {
          updatedFavorites.add(id);
        }
      });
      return Array.from(updatedFavorites);
    });
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        profile, 
        updateProfile,
        favoriteRows,
        deleteRows,
        favoriteRowsAction,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};