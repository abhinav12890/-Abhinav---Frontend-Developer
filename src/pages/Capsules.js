import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { Home, Loading, CapsuleDetail } from "../components";
import useFetch from "../hooks/useFetch";

const ItemsPerPage = 10;

const CapsulesList = React.memo(({ capsules, openCapsuleDetail }) => {
  return (
    <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
      {capsules.map(
        ({
          id,
          type,
          serial,
          launches,
          land_landings,
          water_landings,
          reuse_count,
          status,
          last_update,
        }) => (
          <article key={id} className="articles">
            <h2
              className="text-xl font-bold mb-5 cursor-pointer"
              onClick={() =>
                openCapsuleDetail({
                  type,
                  serial,
                  launches,
                  land_landings,
                  water_landings,
                  reuse_count,
                  status,
                  last_update,
                })
              }
            >
              {type},{" "}
              <span className="text-base opacity-75 font-light">
                {serial}
              </span>
            </h2>
            <ul>
              <li className="mb-1">{launches.length} launches</li>
              <li className="mb-1">{land_landings} land landings</li>
              <li className="mb-1">{water_landings} water landings</li>
              <li className="mb-1">Reused {reuse_count} times</li>
              {status === "active" ? (
                <li className="text-emerald-500">Active</li>
              ) : (
                <li className="text-rose-500">Retired</li>
              )}
            </ul>

            <p className="mt-5 opacity-75">{last_update}</p>
          </article>
        )
      )}
    </div>
  );
});

export default function Capsules() {
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    status: "",
    originalLaunch: "",
    type: "",
  });

  const [capsules] = useFetch("https://api.spacexdata.com/v4/capsules");

  const [currentPage, setCurrentPage] = useState(0);
  const [filteredCapsules, setFilteredCapsules] = useState([]);

  useEffect(() => {
    if (capsules) {
      setFilteredCapsules(capsules);
    }
  }, [capsules]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  }, [searchQuery]);

  const handleSearch = useCallback(() => {
    const filtered = capsules.filter((capsule) => {
      const statusMatch =
        !searchQuery.status || capsule.status === searchQuery.status;
      const originalLaunchMatch =
        !searchQuery.originalLaunch ||
        capsule.original_launch.toString().includes(searchQuery.originalLaunch);
      const typeMatch =
        !searchQuery.type ||
        capsule.type.toLowerCase().includes(searchQuery.type.toLowerCase());

      return statusMatch && originalLaunchMatch && typeMatch;
    });

    setFilteredCapsules(filtered);
  }, [searchQuery, capsules]);

  const paginatedCapsules = filteredCapsules.slice(
    currentPage * ItemsPerPage,
    (currentPage + 1) * ItemsPerPage
  );

  const openCapsuleDetail = useCallback((capsule) => {
    setSelectedCapsule(capsule);
  }, []);

  const closeCapsuleDetail = useCallback(() => {
    setSelectedCapsule(null);
  }, []);

  return (
    <>
      {!capsules ? (
        <Loading />
      ) : (
        <section className="py-32">
          <Home />
          <div className="max-w-screen-lg mx-auto mt-2 mb-6">
            <h2 className="text-lg font-semibold text-white">Search Capsules</h2>
            <div className="flex flex-col items-center space-y-2 mt-2 md:flex-row md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-white">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={searchQuery.status}
                  onChange={handleInputChange}
                  className="p-2 block w-full border rounded-md bg-gray-100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-white">
                  Original Launch
                </label>
                <input
                  type="text"
                  name="originalLaunch"
                  value={searchQuery.originalLaunch}
                  onChange={handleInputChange}
                  className="p-2 block w-full border rounded-md bg-gray-100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-white">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={searchQuery.type}
                  onChange={handleInputChange}
                  className="p-2 block w-full border rounded-md bg-gray-100"
                />
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <CapsulesList capsules={paginatedCapsules} openCapsuleDetail={openCapsuleDetail} />

          <ReactPaginate
            previousLabel={
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-blue-700">
                Previous
              </button>
            }
            nextLabel={
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-blue-700">
                Next
              </button>
            }
            pageCount={Math.ceil(filteredCapsules.length / ItemsPerPage)}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex justify-center"}
            activeClassName={"active"}
            pageLinkClassName={"flex items-center justify-center text-blue-500 hover:bg-blue-200 px-3 py-2 rounded-md"}
            previousClassName={"text-blue-500 hover:bg-blue-200 px-3 py-2 rounded-md"}
            nextClassName={"text-blue-500 hover:bg-blue-200 px-3 py-2 rounded-md"}
          />
        </section>
      )}
      {selectedCapsule && (
        <CapsuleDetail
          capsule={selectedCapsule}
          onClose={closeCapsuleDetail}
        />
      )}
    </>
  );
}
