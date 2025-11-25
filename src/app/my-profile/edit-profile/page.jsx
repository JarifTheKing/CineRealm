"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState("");

  // Load existing DB data
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users?email=${user.email}`)
        .then((res) => {
          const data = res.data[0] || {};
          setFullName(data.fullName || user.displayName || "");
          setPhotoURL(data.photoURL || user.photoURL || "");
          setFavoriteGenres(data.favoriteGenres || "");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/users/${user.email}`, {
        fullName,
        photoURL,
        favoriteGenres,
      });

      toast.success("Profile updated!");
      router.push("/my-profile");
    } catch (error) {
      toast.error("Update failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-700 w-full max-w-lg p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

        <label className="block mb-4">
          <span className="font-semibold">Full Name</span>
          <input
            type="text"
            className="input input-bordered w-full mt-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          <span className="font-semibold">Profile Photo URL</span>
          <input
            type="text"
            className="input input-bordered w-full mt-2"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </label>

        <label className="block mb-4">
          <span className="font-semibold">Favorite Genres</span>
          <input
            type="text"
            className="input input-bordered w-full mt-2"
            value={favoriteGenres}
            onChange={(e) => setFavoriteGenres(e.target.value)}
            placeholder="Action, Sci-Fi, Thriller"
          />
        </label>

        <button className="btn btn-warning w-full mt-4 text-black font-semibold">
          Save Changes
        </button>
      </form>
    </div>
  );
}
