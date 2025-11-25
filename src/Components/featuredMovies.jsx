"use client";

import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

export default function FeaturedMovies() {
  const axiosSecure = useAxios();
  const [movies, setMovies] = useState([]);

  const fallbackImage =
    "https://img.icons8.com/emoji/96/clapper-board-emoji.png";

  useEffect(() => {
    axiosSecure
      .get("/allMovies")
      .then((res) => {
        // Sort by release date newest → oldest
        const sorted = res.data.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );

        // Take latest 4 movies
        setMovies(sorted.slice(0, 4));
      })
      .catch((err) => console.error("Error loading featured movies:", err));
  }, []);

  return (
    <>
      {/* FEATURED MOVIES SECTION */}
      <section className="p-6 md:p-10">
        <h2 className="text-3xl font-bold mb-6">Featured Movies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform duration-300"
            >
              <img
                src={movie.image || fallbackImage}
                onError={(e) => (e.target.src = fallbackImage)}
                className="w-full h-48 object-cover"
                alt={movie.title}
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {movie.title}
                </h3>

                <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                  {movie.genre} • {movie.release_date}
                </p>

                <a href={`/all-movies/${movie._id}`}>
                  <button className="btn btn-outline btn-warning w-full mt-3">
                    View Details
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
