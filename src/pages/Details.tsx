import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { ICharacter } from "../types/ICharacter";
import { getCharacterById, getCharacterEpisodes } from "../services/characters";
import ProfileInformation from "../components/details/ProfileInformation";
import EpisodesList from "../components/details/EpisodesList";
import { IEpisode } from "../types/IEpisode";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [episodesList, setEpisodesList] = useState<IEpisode[] | null>(null);

  useEffect(() => {
    setLoading(true);
    const getCharacter = async () => {
      try {
        const characterData = await getCharacterById(id!);
        setCharacter(characterData);
        const episodeNumbers = characterData.episode.map((url: string) => {
          const parts = url.split("/");
          return parseInt(parts[parts.length - 1], 10);
        });

        const list = await getCharacterEpisodes(episodeNumbers);
        setEpisodesList(list)
      } catch (error) {
        setError(`Failed to load Characters: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    getCharacter();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 my-4">
      <div className="max-w-7xl mx-auto text-center">
      <ProfileInformation profile={character}/>
      <EpisodesList data={episodesList || []}/>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default Details;
