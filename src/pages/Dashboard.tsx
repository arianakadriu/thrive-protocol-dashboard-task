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
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    species: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersData = await getAllCharacters({
          page: pageNumber,
          name: searchFilters.name,
          species: searchFilters.species,
          gender: searchFilters.gender,
          status: searchFilters.status,
        });
        setCharacters(charactersData);
      } catch (error) {
        setError(`Failed to load Characters: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [pageNumber, searchFilters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleOnPageChange = (page: number) => {
    setPageNumber(page);
  };

  const handleOnSearchChange = (field: string, value: string) => {
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
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
            onSearchName={(value) => handleOnSearchChange("name", value)}
            onSearchGender={(value) => handleOnSearchChange("gender", value)}
            onSearchSpecies={(value) => handleOnSearchChange("species", value)}
            onSearchStatus={(value) => handleOnSearchChange("status", value)}
            fetchPageData={handleOnPageChange}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
