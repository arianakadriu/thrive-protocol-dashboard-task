import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Table from "../components/dashboard/Table";
import { getAllCharacters } from "../services/characters";
import { ICharacters } from "../types/ICharacters";

const Dashboard: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacters>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchSpeciesText, setSearchSpeciesText] = useState<string>("");
  const [searchStatusText, setSearchStatusText] = useState<string>("");
  const [searchGenderText, setSearchGenderText] = useState<string>("");

  useEffect(() => {
    const fetchCharacters = async (
      pageNumber: number,
      searchText: string,
      searchSpeciesText: string,
      searchGenderText: string,
      searchStatusText: string
    ) => {
      try {
        const charactersData = await getAllCharacters({
          page: pageNumber,
          name: searchText,
          species: searchSpeciesText,
          gender: searchGenderText,
          status: searchStatusText,
        });
        setCharacters(charactersData);
      } catch (error) {
        setError(`Failed to load Characters: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters(
      pageNumber,
      searchText,
      searchSpeciesText,
      searchGenderText,
      searchStatusText
    );
  }, [
    pageNumber,
    searchText,
    searchSpeciesText,
    searchGenderText,
    searchStatusText,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleOnPageChange = (page: number) => {
    setPageNumber(page);
  };

  const handleOnSearchNameChange = (searchText: string) => {
    setSearchText(searchText);
  };
  const handleOnSearchGenderChange = (searchText: string) => {
    setSearchGenderText(searchText);
  };
  const handleOnSearchSpeciesChange = (searchText: string) => {
    setSearchSpeciesText(searchText);
  };
  const handleOnSearchStatusChange = (searchText: string) => {
    setSearchStatusText(searchText);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4 flex">Dashboard</h2>
          <Table
            characters={characters?.results || []}
            paginationData={characters?.info}
            onSearchName={handleOnSearchNameChange}
            onSearchGender={handleOnSearchGenderChange}
            onSearchSpecies={handleOnSearchSpeciesChange}
            onSearchStatus={handleOnSearchStatusChange}
            fetchPageData={handleOnPageChange}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
