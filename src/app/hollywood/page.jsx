"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

export default function Hollywood() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  // ⭐ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const axiosSecure = useAxios();

  const fallbackImage =
    "https://img.icons8.com/emoji/96/clapper-board-emoji.png";

  useEffect(() => {
    axiosSecure
      .get("/allMovies")
      .then((res) => {
        const filtered = res.data.filter(
          (movie) =>
            movie.country?.toLowerCase().trim() === "usa" ||
            movie.country?.toLowerCase().trim() === "uk"
        );

        setMovies(filtered);
        setAllMovies(filtered);
      })
      .catch((err) => console.error("Error loading movies:", err));
  }, []);

  // ⭐ SEARCH
  const handleSearch = (value) => {
    setSearch(value);

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );

    setMovies(filtered);
    setCurrentPage(1);
  };

  // ⭐ SORT
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
    setCurrentPage(1);
  };

  // ⭐ PAGINATION
  const indexOfLast = currentPage * moviesPerPage;
  const indexOfFirst = indexOfLast - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Hollywood Movies</h1>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentMovies.map((movie, index) => (
          <div
            key={index}
            className="bg-fuchsia-200 border rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col h-[400px]"
          >
            <div className="w-full h-40 mb-3">
              <img
                src={movie.image || fallbackImage}
                alt={movie.title}
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
              <p>
                <span className="font-semibold">Release:</span>{" "}
                {movie.release_date}
              </p>
              <p>
                <span className="font-semibold">Language:</span>{" "}
                {movie.language}
              </p>
            </div>

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

      {/* ⭐ Pagination */}
      <div className="flex justify-center mt-8 gap-2">
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
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-active" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
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
