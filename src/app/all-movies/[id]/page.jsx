"use client";

import { use, useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import PrivateRoute from "@/Components/privetRoute";

export default function Details({ params }) {
  const { id } = use(params);

  const axiosSecure = useAxios();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/allMovies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [axiosSecure, id]);

  if (!movie) {
    return (
      <div className="p-10 text-white text-xl animate-pulse">
        Loading movie details...
      </div>
    );
  }

  const fallbackImg = "https://img.icons8.com/emoji/96/clapper-board-emoji.png";

  const handleDownload = () => {
    toast.success("Downloading...");

    setTimeout(() => {
      toast.success("Download Completed!");
    }, 2000);
  };

  return (
    <PrivateRoute>
      <div className="p-4 md:p-8 max-w-6xl mx-auto text-white space-y-8 animate-[fadeIn_0.9s_ease-out]">
        {/* Banner */}
        <div
          className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-xl 
      hover:scale-[1.02] transition duration-500 border-4 border-purple-500/40"
        >
          <Image
            src={movie.image || fallbackImg}
            alt={movie.title}
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title + Meta */}
        <div className="space-y-3 animate-[slideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            {movie.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600">
              ⭐ IMDb: {movie.imdb_rating}
            </span>
            <span className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-600 to-cyan-500">
              🎬 Genre: {movie.genre}
            </span>
            <span className="px-3 py-1 rounded-md bg-gradient-to-r from-green-600 to-lime-500">
              🌐 Language: {movie.language}
            </span>
            <span className="px-3 py-1 rounded-md bg-gradient-to-r from-pink-600 to-red-500">
              📅 Release: {movie.release_date}
            </span>
          </div>
        </div>

        {/* Description */}
        <div
          className="p-5 md:p-7 rounded-xl shadow-lg 
      bg-gradient-to-br from-indigo-600/40 to-purple-600/30 border border-white/20 animate-[fadeIn_1.2s_ease-out]"
        >
          <h2 className="text-2xl font-semibold mb-3 text-yellow-300 drop-shadow-lg">
            Description
          </h2>
          <p className="leading-relaxed text-gray-200">{movie.description}</p>
        </div>

        {/* Storyline */}
        <div
          className="p-5 md:p-7 rounded-xl shadow-lg 
      bg-gradient-to-br from-rose-600/40 to-orange-500/30 border border-white/20 animate-[fadeIn_1.4s_ease-out]"
        >
          <h2 className="text-2xl font-semibold mb-3 text-orange-300 drop-shadow-lg">
            Storyline
          </h2>
          <p className="leading-relaxed text-gray-200">
            {movie.story_line || "No storyline available for this movie."}
          </p>
        </div>

        {/* Extra Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Movie Info */}
          <div
            className="p-5 rounded-xl shadow-lg 
        bg-gradient-to-br from-green-600/40 to-emerald-500/30 border border-white/20 animate-[slideUp_0.8s_ease-out]"
          >
            <h3 className="text-xl font-semibold mb-2 text-lime-300 drop-shadow-md">
              Movie Info
            </h3>
            <p>
              <strong>Actors:</strong> {movie.casts || "Not Available"}
            </p>
            <p>
              <strong>Director:</strong> {movie.director || "Unknown"}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.run_time || "N/A"}
            </p>
          </div>

          {/* Additional Details */}
          <div
            className="p-5 rounded-xl shadow-lg 
        bg-gradient-to-br from-blue-600/40 to-cyan-500/30 border border-white/20 animate-[slideUp_1s_ease-out]"
          >
            <h3 className="text-xl font-semibold mb-2 text-cyan-300 drop-shadow-md">
              Additional Details
            </h3>
            <p>
              <strong>Country:</strong> {movie.country || "N/A"}
            </p>
            <p>
              <strong>Quality:</strong> {movie.quality || "N/A"}
            </p>
            <p>
              <strong>Resolution:</strong> {movie.resolution || "N/A"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 animate-[fadeIn_1.4s_ease-out]">
          {/* Back */}
          <Link
            href="/all-movies"
            className="inline-block btn backdrop-blur-md px-4 py-2 rounded-lg 
          bg-gradient-to-r from-gray-500 to-gray-700 
          hover:from-amber-300 hover:to-yellow-400 hover:text-black 
          transition border border-white/30"
          >
            ← Back to Movies
          </Link>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="inline-block btn px-4 py-2 rounded-lg 
          bg-gradient-to-r from-yellow-400 to-orange-500 text-black
          hover:from-green-400 hover:to-emerald-500 
          transition border border-white/30"
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </PrivateRoute>
  );
}
