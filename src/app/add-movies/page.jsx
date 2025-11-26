"use client";

import React, { useState } from "react";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import useAuth from "@/hooks/useAuth";
import PrivateRoute from "@/Components/privetRoute";

// Disable SSR → fixes hydration
export const ssr = false;

function AddMoviesComponent() {
  const axiosSecure = useAxios();
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    image: "",
    genre: "",
    imdb_rating: "",
    release_date: "",
    language: "",
    country: "",
    run_time: "",
    story_line: "",
    description: "",
    casts: "",
    director: "",
    quality: "",
    resolution: "",
    size: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = {
      ...form,
      imdb_rating: Number(form.imdb_rating),
      casts: form.casts.split(",").map((c) => c.trim()),
      user_email: user?.email,
    };

    axiosSecure
      .post("/allMovies", sendData)
      .then(() => {
        toast.success("Movie Added Successfully! 🎬🔥");
        router.push("/manage-movies");

        setForm({
          title: "",
          image: "",
          genre: "",
          imdb_rating: "",
          release_date: "",
          language: "",
          country: "",
          run_time: "",
          story_line: "",
          description: "",
          casts: "",
          director: "",
          quality: "",
          resolution: "",
          size: "",
        });
      })
      .catch((err) => {
        toast.error("Failed to add movie!");
        console.log("Error adding movie:", err);
      });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen rounded-3xl px-4 py-10 bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center">
        {/* Floating background glow animation */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-700/30 blur-[180px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-700/30 blur-[180px] rounded-full animate-pulse delay-300"></div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-wide drop-shadow-xl text-center animate__animated animate__fadeIn animate__slow">
          🎬 Add a New Movie
        </h1>

        <form
          onSubmit={handleSubmit}
          className="
          max-w-4xl w-full mx-auto 
          grid grid-cols-1 md:grid-cols-2 gap-5
          p-8 rounded-2xl
          bg-white/10 backdrop-blur-2xl 
          border border-white/20 shadow-2xl
          animate__animated animate__fadeInUp animate__faster
        "
        >
          {/* INPUT BOXES WITH ANIMATION */}
          {[
            { name: "title", placeholder: "Movie Title" },
            { name: "image", placeholder: "Poster URL" },
            { name: "genre", placeholder: "Genre" },
            { name: "imdb_rating", placeholder: "IMDB Rating" },
            { name: "release_date", placeholder: "Release Date" },
            { name: "language", placeholder: "Language" },
            { name: "country", placeholder: "Country" },
            { name: "run_time", placeholder: "Run Time (e.g., 1h 59m)" },
            { name: "director", placeholder: "Director" },
            { name: "quality", placeholder: "Quality (e.g., BluRay)" },
            { name: "resolution", placeholder: "Resolution (e.g., 1080p)" },
            { name: "size", placeholder: "File Size" },
          ].map((input, i) => (
            <div
              key={input.name}
              className="animate__animated animate__fadeInUp"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <input
                className="
                w-full px-4 py-3 rounded-xl 
                bg-white/5 border border-white/20 
                focus:border-red-500 focus:ring-2 focus:ring-red-600 
                transition-all duration-300 
                placeholder-gray-400 
                hover:bg-white/10
                hover:scale-[1.01]
              "
                name={input.name}
                placeholder={input.placeholder}
                value={form[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Story Line */}
          <textarea
            className="
            col-span-1 md:col-span-2 
            w-full px-4 py-3 rounded-xl 
            bg-white/5 border border-white/20
            focus:border-red-500 focus:ring-2 focus:ring-red-600
            transition-all duration-300
            placeholder-gray-400 
            hover:bg-white/10
            animate__animated animate__fadeInUp
          "
            name="story_line"
            placeholder="Story Line"
            value={form.story_line}
            onChange={handleChange}
          />

          {/* Description */}
          <textarea
            className="
            col-span-1 md:col-span-2 
            w-full px-4 py-3 rounded-xl 
            bg-white/5 border border-white/20
            focus:border-red-500 focus:ring-2 focus:ring-red-600
            transition-all duration-300
            placeholder-gray-400 
            hover:bg-white/10
            animate__animated animate__fadeInUp
          "
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          {/* Casts */}
          <input
            className="
            col-span-1 md:col-span-2 
            w-full px-4 py-3 rounded-xl 
            bg-white/5 border border-white/20
            focus:border-red-500 focus:ring-2 focus:ring-red-600
            transition-all duration-300
            placeholder-gray-400 
            hover:bg-white/10
            animate__animated animate__fadeInUp
          "
            name="casts"
            placeholder="Casts (comma separated)"
            value={form.casts}
            onChange={handleChange}
          />

          {/* SUBMIT BUTTON */}
          <button
            className="
    col-span-1 md:col-span-2 
    py-3 text-xl font-bold rounded-xl 
    bg-yellow-400 text-black
    hover:bg-yellow-300 
    shadow-xl hover:shadow-2xl transition-all duration-300 
    transform hover:scale-[1.05] active:scale-[0.96]
    animate__animated animate__pulse animate__slow animate__repeat-2
  "
          >
            ➕ Add Movie
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
}

export default dynamic(() => Promise.resolve(AddMoviesComponent), {
  ssr: false,
});
