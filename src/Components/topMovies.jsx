"use client";
import React, { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

export default function TopMovies() {
  const axios = useAxios();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("/allMovies")
      .then((res) => {
        const topThree = res.data
          .sort((a, b) => b.imdb_rating - a.imdb_rating)
          .slice(0, 3);

        setMovies(topThree);
      })
      .catch((err) => console.error("Top-rated load error:", err));
  }, [axios]);

  return (
    <section className="p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6">Top Rated Movies</h2>

      {movies.length === 0 ? (
        <p className="text-gray-400">No top-rated movies available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-gradient-to-br from-[#1e1e2f] via-[#292945] to-[#1b1b29] p-4 rounded-2xl 
              shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 
              border border-white/10 h-[380px] flex flex-col"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-xl mb-3 shadow-md"
              />

              <div className="flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-white line-clamp-1">
                  {movie.title}
                </h3>

                <p className="text-sm text-yellow-400 mb-2">
                  ⭐ {movie.imdb_rating} IMDb
                </p>

                <p className="text-xs text-gray-300 line-clamp-3 flex-grow">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
