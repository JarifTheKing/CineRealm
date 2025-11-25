"use client";
import React from "react";

export default function MyProfile({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-6 flex items-center justify-center">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 max-w-3xl w-full animate-fadeIn">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative">
            <div className="w-36 h-36 mt-2 rounded-full overflow-hidden border-4 border-white/40 shadow-xl">
              <img
                src={
                  user?.photoURL ||
                  "https://api.dicebear.com/7.x/initials/svg?seed=User"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full blur-xl bg-fuchsia-500 opacity-40 animate-pulse"></div>
          </div>

          <h1 className="text-4xl font-bold text-white mt-6 drop-shadow-xl">
            {user?.fullName || "My Profile"}
          </h1>
          <p className="text-white/80">Your personal account dashboard</p>
        </div>

        {/* Info Boxes */}
        <div className="space-y-5">
          {/* About */}
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-white mb-2">About Me</h2>
            <p className="text-white/80">
              Welcome, {user?.fullName || "User"}! Customize your profile and
              manage your preferences.
            </p>
          </div>

          {/* Account Details */}
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-white mb-3">
              Account Details
            </h2>
            <ul className="text-white/80 space-y-2">
              <li>
                <span className="font-semibold text-white">Full Name:</span>{" "}
                {user?.fullName || "Not Provided"}
              </li>

              <li>
                <span className="font-semibold text-white">Username:</span>{" "}
                {user?.username || "Not Provided"}
              </li>

              <li>
                <span className="font-semibold text-white">Email:</span>{" "}
                {user?.email || "Not Provided"}
              </li>

              <li>
                <span className="font-semibold text-white">
                  Favorite Genre:
                </span>{" "}
                {user?.favoriteGenres || "Not Selected"}
              </li>

              <li>
                <span className="font-semibold text-white">User ID:</span>{" "}
                {user?._id || "N/A"}
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="p-6 rounded-2xl bg-white/10 border border-white/20 shadow-lg hover:shadow-2xl transition relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-blue-500/20 blur-2xl opacity-40 animate-pulse"></div>

            <h2 className="text-2xl font-semibold text-white mb-5 relative z-10">
              Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <button
                className="btn btn-warning flex items-center justify-center gap-2 py-3 rounded-xl 
                  bg-gradient-to-r from-pink-500 to-purple-600 
                  text-black font-semibold shadow-lg hover:scale-105 
                  hover:shadow-purple-500/50 transition-all duration-300"
              >
                ✨ Edit Profile
              </button>

              <button
                className="btn btn-warning flex items-center justify-center gap-2 py-3 rounded-xl 
                  bg-gradient-to-r from-red-500 to-red-700  
                  text-black font-semibold shadow-lg hover:scale-105 
                  hover:shadow-red-500/50 transition-all duration-300"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
