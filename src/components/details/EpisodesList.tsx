import React, { useState } from "react";
import { IEpisode } from "../../types/IEpisode";
import ItemsPagination from "../common/ItemsPagination";

interface IProps {
  data: IEpisode[] | IEpisode;
}

const EpisodesList: React.FC<IProps> = ({ data }) => {
  // Pagination
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

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 my-8">Episodes List</h2>
      <div>
        {episodesData.length === 0 ? (
          <div className="text-center text-gray-700 text-lg font-medium my-8">
            No episodes available.
          </div>
        ) : (
          <>
            {currentItems.length > 0 && (
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
                      Episode:{" "}
                      <span className="font-semibold">{episode.episode}</span>
                    </p>
                    <p className="text-gray-600 mt-1">
                      Air Date:{" "}
                      <span className="font-semibold">{episode.air_date}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}

            <ItemsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default EpisodesList;
