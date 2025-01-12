import React, { useState } from "react";
import { IEpisode } from "../../types/IEpisode";
import Button from "../common/Button";

interface IProps {
  data: IEpisode[] | IEpisode;
}

const EpisodesList: React.FC<IProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const episodesData = Array.isArray(data) ? data : [data];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = episodesData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(episodesData.length / itemsPerPage);

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

  if (!episodesData || episodesData.length === 0) {
    return (
      <div className="text-center text-gray-700 text-lg font-medium my-8">
        No episodes available.
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 my-8">Episodes List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((episode) => (
          <div
            key={episode.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {episode.name}
            </h3>
            <p className="text-gray-600 mt-1">
              Episode: <span className="font-semibold">{episode.episode}</span>
            </p>
            <p className="text-gray-600 mt-1">
              Air Date:{" "}
              <span className="font-semibold">{episode.air_date}</span>
            </p>
          </div>
        ))}
      </div>
      {currentItems && currentItems.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            title="Previous"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white bg-sky-800 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-900"
            }`}
          />
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            title="Next"
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white bg-sky-800 rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sky-900"
            }`}
          />
        </div>
      )}
    </>
  );
};

export default EpisodesList;
