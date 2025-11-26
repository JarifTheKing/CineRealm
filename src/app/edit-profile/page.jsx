"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/Components/privetRoute";

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
    <PrivateRoute>
      <div className="relative min-h-screen flex justify-center items-center px-6 py-12 overflow-hidden">
        {/* Background Gradient Lights */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-95"></div>

        {/* Floating Aurora Lights */}
        <div className="absolute w-[600px] h-[600px] bg-blue-500/30 blur-[200px] rounded-full -top-40 left-0 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-pink-500/30 blur-[200px] rounded-full bottom-0 right-0 animate-[pulse_6s_ease-in-out_infinite]"></div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="
          relative z-10 w-full max-w-lg 
          p-10 rounded-3xl 
          bg-white/10 backdrop-blur-2xl 
          border border-white/20 
          shadow-[0_0_50px_-10px_rgba(255,255,255,0.25)]
          animate-[fadeInUp_0.8s_ease-out]
        "
        >
          <h1 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
            Edit Profile ✨
          </h1>

          {/* Full Name */}
          <label className="block mb-5">
            <span className="text-white font-semibold text-lg">Full Name</span>
            <input
              type="text"
              className="
              mt-2 w-full px-4 py-3 rounded-xl 
              bg-white/20 border border-white/30 
              text-white placeholder-white/60
              focus:outline-none focus:border-purple-400 
              transition-all
            "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>

          {/* Photo URL */}
          <label className="block mb-5">
            <span className="text-white font-semibold text-lg">
              Profile Photo URL
            </span>
            <input
              type="text"
              className="
              mt-2 w-full px-4 py-3 rounded-xl 
              bg-white/20 border border-white/30 
              text-white placeholder-white/60
              focus:outline-none focus:border-blue-400 
              transition-all
            "
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </label>

          {/* Favorite Genres */}
          <label className="block mb-6">
            <span className="text-white font-semibold text-lg">
              Favorite Genres
            </span>
            <input
              type="text"
              className="
              mt-2 w-full px-4 py-3 rounded-xl 
              bg-white/20 border border-white/30 
              text-white placeholder-white/60
              focus:outline-none focus:border-pink-400 
              transition-all
            "
              value={favoriteGenres}
              onChange={(e) => setFavoriteGenres(e.target.value)}
              placeholder="Action, Romance, Thriller"
            />
          </label>

          {/* Save Button */}
          <button
            className="
            w-full py-3 text-xl font-bold 
            rounded-xl 
            bg-gradient-to-r from-[#FFD266] to-[#FF9A3D]
            text-black 
            shadow-lg hover:shadow-xl 
            transform transition-all duration-300 
            hover:scale-[1.05] active:scale-[0.95]
          "
          >
            Save Changes
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
}
