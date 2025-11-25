"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";

export default function EditMovie({ params }) {
  const { id } = use(params); // unwrap params

  const axiosSecure = useAxios();
  const router = useRouter();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load movie
  useEffect(() => {
    if (!id) return;

    axiosSecure
      .get(`/allMovies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load movie");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedMovie = {
      title: form.title.value,
      genre: form.genre.value,
      imdb_rating: form.rating.value,
      image: form.image.value,
      release_date: form.release_date.value,
    };

    axiosSecure
      .put(`/allMovies/${id}`, updatedMovie)
      .then(() => {
        toast.success("Movie updated!");
        router.push("/manage-movies");
      })
      .catch(() => toast.error("Update failed"));
  };

  if (loading)
    return (
      <p className="text-white p-6 animate-pulse text-center text-xl">
        Loading movie...
      </p>
    );

  return (
    <div className="min-h-screen rounded-3xl flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Blurred Background Lights */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/40 rounded-full blur-[180px] -top-40 left-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-fuchsia-600/40 rounded-full blur-[160px] bottom-0 right-0"></div>

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-[0_0_50px_-10px_rgba(255,255,255,0.25)] animate__animated animate__fadeInUp animate__faster">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide mb-6 animate__animated animate__fadeIn">
          ✏️ Edit Movie
        </h1>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Title */}
          <div className="flex flex-col">
            <label className="text-white/80 font-semibold mb-1">Title</label>
            <input
              defaultValue={movie.title}
              name="title"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/40 border-white/30"
              required
            />
          </div>

          {/* Genre */}
          <div className="flex flex-col">
            <label className="text-white/80 font-semibold mb-1">Genre</label>
            <input
              defaultValue={movie.genre}
              name="genre"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/40 border-white/30"
              required
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label className="text-white/80 font-semibold mb-1">Rating</label>
            <input
              defaultValue={movie.imdb_rating}
              name="rating"
              type="number"
              step="0.1"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/40 border-white/30"
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col">
            <label className="text-white/80 font-semibold mb-1">
              Image URL
            </label>
            <input
              defaultValue={movie.image}
              name="image"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/40 border-white/30"
              required
            />
          </div>

          {/* Release Date */}
          <div className="flex flex-col">
            <label className="text-white/80 font-semibold mb-1">
              Release Date
            </label>
            <input
              defaultValue={movie.release_date}
              name="release_date"
              type="date"
              className="input input-bordered w-full bg-white/20 text-white border-white/30"
              required
            />
          </div>

          {/* Save Button */}
          <button
            className="
              w-full py-3 text-xl font-bold 
              bg-gradient-to-r from-yellow-400 to-yellow-500 
              hover:from-yellow-500 hover:to-yellow-600 
              text-black rounded-xl shadow-lg hover:shadow-2xl 
              transition-all duration-300 transform hover:scale-[1.04] active:scale-[0.96]
              animate__animated animate__pulse animate__slow animate__repeat-2
            "
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
