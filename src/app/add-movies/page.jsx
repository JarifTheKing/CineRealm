"use client";

import React, { useState } from "react";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // FIXED
import dynamic from "next/dynamic";
import useAuth from "@/hooks/useAuth";

// Disable SSR → fixes hydration error completely
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
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Add a Movie</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-6 rounded-xl"
      >
        <input
          className="input input-bordered"
          name="title"
          placeholder="Movie Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="image"
          placeholder="Poster URL"
          value={form.image}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="imdb_rating"
          placeholder="IMDB Rating"
          value={form.imdb_rating}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="release_date"
          placeholder="Release Date"
          value={form.release_date}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="language"
          placeholder="Language"
          value={form.language}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="run_time"
          placeholder="Run Time (e.g., 1h 59m)"
          value={form.run_time}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="director"
          placeholder="Director"
          value={form.director}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="quality"
          placeholder="Quality (e.g., BluRay)"
          value={form.quality}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="resolution"
          placeholder="Resolution (e.g., 1080p)"
          value={form.resolution}
          onChange={handleChange}
        />

        <input
          className="input input-bordered"
          name="size"
          placeholder="File Size"
          value={form.size}
          onChange={handleChange}
        />

        <textarea
          className="textarea textarea-bordered col-span-1 md:col-span-2"
          name="story_line"
          placeholder="Story Line"
          value={form.story_line}
          onChange={handleChange}
        />

        <textarea
          className="textarea textarea-bordered col-span-1 md:col-span-2"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          className="input input-bordered col-span-1 md:col-span-2"
          name="casts"
          placeholder="Casts (comma separated)"
          value={form.casts}
          onChange={handleChange}
        />

        <button className="btn btn-warning mt-4 col-span-1 md:col-span-2">
          Add Movie
        </button>
      </form>
    </div>
  );
}

// Export component without SSR → COMPLETE hydration fix
export default dynamic(() => Promise.resolve(AddMoviesComponent), {
  ssr: false,
});
