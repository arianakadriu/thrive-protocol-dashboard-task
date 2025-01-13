import React from "react";
import { ICharacter } from "../../types/ICharacter";
import NavLink from "../common/NavLink";

interface IProps {
  character: ICharacter;
}

const FavoriteCharacter: React.FC<IProps> = ({ character }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out">
      <div className="relative">
        <img
          className="w-full h-56 rounded-t-lg object-cover"
          src={character.image}
          alt={`${character.name}'s profile`}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-3 rounded-b-lg">
          <h3 className="text-lg font-semibold">{character.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <NavLink
          title="Learn More"
          link={`details/${character.id}`}
          className="text-sm font-bold text-gray-800 hover:text-sky-900 transition"
        />
      </div>
    </div>
  );
};

export default FavoriteCharacter;
