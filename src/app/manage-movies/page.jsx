"use client";

import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ManageMovies() {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  // ⭐ NEW STATES
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/moviesByUser?email=${user.email}`)
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err));
  }, [user]);

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/allMovies/${id}`)
      .then(() => {
        toast.success("Movie deleted!");
        setMovies((prev) => prev.filter((m) => m._id !== id));
      })
      .catch(() => toast.error("Failed to delete"));
  };

  // ⭐ SEARCH
  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ SORT
  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "rating-high") return b.imdb_rating - a.imdb_rating;
    if (sortType === "rating-low") return a.imdb_rating - b.imdb_rating;
    if (sortType === "date-new")
      return new Date(b.release_date) - new Date(a.release_date);
    if (sortType === "date-old")
      return new Date(a.release_date) - new Date(b.release_date);
    return 0;
  });

  // ⭐ PAGINATION
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = sorted.slice(start, start + itemsPerPage);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">My Added Movies</h1>

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
          <option value="rating-high">Rating High → Low</option>
          <option value="rating-low">Rating Low → High</option>
          <option value="date-new">Release New → Old</option>
          <option value="date-old">Release Old → New</option>
        </select>
      </div>

      {movies.length === 0 && (
        <p className="text-gray-400">You haven’t added any movies yet.</p>
      )}

      {/* ⭐ Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginated.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col"
          >
            <img
              src={movie.image}
              className="w-full h-44 object-cover rounded-lg mb-3"
            />

            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">
              {movie.genre} • ⭐ {movie.imdb_rating}
            </p>

            <div className="mt-3 flex gap-2">
              <Link
                href={`/manage-movies/edit/${movie._id}`}
                className="btn btn-sm btn-info w-1/2"
              >
                Edit
              </Link>

              <button
                className="btn btn-sm btn-error w-1/2"
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ⭐ Pagination Buttons */}
      {sorted.length > itemsPerPage && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            « Prev
          </button>

          <span className="text-white font-semibold px-4 py-1">
            Page {currentPage} / {totalPages}
          </span>

          <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next »
          </button>
        </div>
      )}
    </div>
  );
}
