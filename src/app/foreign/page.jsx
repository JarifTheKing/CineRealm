"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

export default function ForeignMovies() {
  const axiosSecure = useAxios();
  const [movies, setMovies] = useState([]);

  // ⭐ NEW STATES
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // ⭐ 8 movies per page

  useEffect(() => {
    axiosSecure
      .get("/allMovies")
      .then((res) => {
        const foreign = res.data.filter((movie) => {
          const country = movie.country?.toLowerCase().trim();
          return country !== "india" && country !== "usa" && country !== "uk";
        });

        setMovies(foreign);
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, []);

  const fallbackImage =
    "https://img.icons8.com/emoji/96/clapper-board-emoji.png";

  // ⭐ SEARCH FILTER
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ SORTING
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortType === "rating-high") return b.imdb_rating - a.imdb_rating;
    if (sortType === "rating-low") return a.imdb_rating - b.imdb_rating;
    if (sortType === "date-new")
      return new Date(b.release_date) - new Date(a.release_date);
    if (sortType === "date-old")
      return new Date(a.release_date) - new Date(b.release_date);
    return 0;
  });

  // ⭐ PAGINATION
  const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = sortedMovies.slice(start, start + itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Foreign Movies</h1>

      {/* ⭐ Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies…"
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="select select-bordered w-full md:w-1/4"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="rating-high">Rating: High → Low</option>
          <option value="rating-low">Rating: Low → High</option>
          <option value="date-new">Release: New → Old</option>
          <option value="date-old">Release: Old → New</option>
        </select>
      </div>

      {/* ⭐ Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedMovies.map((movie, index) => (
          <div
            key={index}
            className="bg-fuchsia-200 border rounded-xl p-4 flex flex-col h-[400px]"
          >
            {/* Poster */}
            <div className="w-full h-40 mb-3">
              <img
                src={movie.image || fallbackImage}
                onError={(e) => (e.target.src = fallbackImage)}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-black line-clamp-1">
              {movie.title}
            </h2>

            {/* Genre + Rating */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-md text-gray-700">
                {movie.genre}
              </span>

              <span className="text-sm font-semibold text-yellow-600">
                ⭐ {movie.imdb_rating}
              </span>
            </div>

            {/* Details */}
            <div className="mt-3 text-sm text-gray-600">
              <p className="line-clamp-1">
                <span className="font-semibold">Release:</span>{" "}
                {movie.release_date}
              </p>
              <p className="line-clamp-1">
                <span className="font-semibold">Language:</span>{" "}
                {movie.language}
              </p>
            </div>

            {/* Button */}
            <div className="mt-auto">
              <Link href={`/all-movies/${movie._id}`}>
                <button className="btn btn-warning w-full text-black font-semibold">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ⭐ Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          « Prev
        </button>

        <span className="text-white font-semibold px-4 py-1">
          Page {currentPage} / {totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next »
        </button>
      </div>
    </div>
  );
}
