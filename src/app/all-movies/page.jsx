"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

export default function AllMovies() {
  const axiosSecure = useAxios();
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  // ⭐ PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    axiosSecure
      .get("/allMovies")
      .then((res) => {
        setMovies(res.data);
        setAllMovies(res.data);
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, [axiosSecure]);

  // ⭐ SEARCH MOVIES
  const handleSearch = (value) => {
    setSearch(value);

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );

    setMovies(filtered);
    setCurrentPage(1);
  };

  // ⭐ SORT MOVIES
  const handleSort = (type) => {
    setSortType(type);

    let sortedMovies = [...movies];

    if (type === "latest") {
      sortedMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }
    if (type === "oldest") {
      sortedMovies.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    }
    if (type === "rating-high") {
      sortedMovies.sort((a, b) => b.imdb_rating - a.imdb_rating);
    }
    if (type === "rating-low") {
      sortedMovies.sort((a, b) => a.imdb_rating - b.imdb_rating);
    }

    setMovies(sortedMovies);
    setCurrentPage(1); // reset page
  };

  const fallbackImage =
    "https://img.icons8.com/emoji/96/clapper-board-emoji.png";

  // ⭐ PAGINATION LOGIC (slice the data)
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="p-6 animate-[fadeIn_0.8s_ease-out]">
      <h1 className="text-3xl mb-3 font-bold text-white opacity-0 translate-y-3 animate-[fadeInUp_0.8s_ease-out_forwards]">
        All Movies
      </h1>

      <p className="text-gray-400 mb-6 opacity-0 translate-y-3 animate-[fadeInUp_1s_ease-out_forwards]">
        Explore a wide collection of movies from all genres, sorted and filtered
        just for you.
      </p>

      {/* ⭐ Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 opacity-0 animate-[fadeIn_1.3s_ease-out_forwards]">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search movies..."
          className="input input-bordered w-full sm:w-1/2"
        />

        <select
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
          className="select select-bordered w-full sm:w-1/2"
        >
          <option value="">Sort by</option>
          <option value="latest">Release Date: Latest</option>
          <option value="oldest">Release Date: Oldest</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
        </select>
      </div>

      {/* ⭐ Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentMovies.map((movie, index) => (
          <div
            key={index}
            className="bg-fuchsia-200 border rounded-xl p-4 flex flex-col h-[400px] opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards] hover:scale-[1.03] transition-all duration-300"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="w-full h-40 mb-3">
              <img
                src={movie.image || fallbackImage}
                onError={(e) => (e.target.src = fallbackImage)}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <h2 className="text-lg font-semibold text-black line-clamp-1">
              {movie.title}
            </h2>

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-md text-gray-700">
                {movie.genre}
              </span>

              <span className="text-sm font-semibold text-yellow-600">
                ⭐ {movie.imdb_rating}
              </span>
            </div>

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

            <div className="mt-auto">
              <Link href={`/all-movies/${movie.title}`}>
                <button className="btn btn-warning w-full text-black font-semibold">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ⭐ PAGINATION BUTTONS */}
      <div className="flex justify-center mt-8 gap-2 opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          « Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-active" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next »
        </button>
      </div>
    </div>
  );
}
