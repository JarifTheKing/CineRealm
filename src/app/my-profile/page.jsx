"use client";
import React from "react";

export default function MyProfile({ user }) {
  return (
    <div className="min-h-screen rounded-3xl flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Aurora Background Lights */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-90"></div>

      {/* Floating Glow Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[220px] -top-52 -left-20 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute w-[550px] h-[550px] bg-indigo-500/30 rounded-full blur-[220px] bottom-0 right-0 animate-[pulse_7s_ease-in-out_infinite]"></div>

      {/* Main Card */}
      <div
        className="
        relative z-10 w-full max-w-3xl 
        bg-white/10 backdrop-blur-3xl 
        border border-white/20 p-10 rounded-3xl 
        shadow-[0_0_60px_-10px_rgba(255,255,255,0.45)]
        animate__animated animate__fadeInUp animate__fast
        hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.55)]
        transition-all duration-700
      "
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          {/* Profile Image with Aurora Ring */}
          <div className="relative group">
            <div
              className="
              w-36 h-36 mt-2 rounded-full overflow-hidden 
              border-4 border-white/40 shadow-xl
              group-hover:scale-105 transition-transform duration-700
            "
            >
              <img
                src={
                  user?.photoURL ||
                  "https://api.dicebear.com/7.x/initials/svg?seed=User"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Animated Rainbow Glow */}
            <div
              className="
              absolute inset-0 rounded-full blur-2xl 
              bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
              opacity-40 group-hover:opacity-70 
              transition-all duration-700 animate-pulse
            "
            ></div>
          </div>

          {/* User Name */}
          <h1
            className="
            text-4xl font-extrabold text-white mt-6 tracking-wider drop-shadow-xl 
            animate__animated animate__fadeIn
          "
          >
            {user?.fullName || "My Profile"}
          </h1>
          <p className="text-white/80">Your personal account dashboard</p>
        </div>

        {/* Info Boxes */}
        <div className="space-y-5">
          {/* About Box */}
          <div
            className="
            p-6 rounded-2xl 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 
            shadow-lg hover:shadow-2xl hover:-translate-y-1 
            duration-500 transition-all
          "
          >
            <h2 className="text-2xl font-semibold text-white mb-2">About Me</h2>
            <p className="text-white/80">
              Welcome, {user?.fullName || "User"}! Customize your profile and
              manage your preferences.
            </p>
          </div>

          {/* Account Details Box */}
          <div
            className="
            p-6 rounded-2xl 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 
            shadow-lg hover:shadow-2xl hover:-translate-y-1 
            duration-500 transition-all
          "
          >
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

          {/* Action Buttons Box */}
          <div
            className="
            p-6 rounded-2xl 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 shadow-lg 
            hover:shadow-2xl hover:-translate-y-1 
            duration-500 transition-all 
            relative overflow-hidden
          "
          >
            {/* Animated Color Wave */}
            <div
              className="
              absolute inset-0 
              bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 
              blur-3xl opacity-50 
              animate-[pulse_5s_infinite]
            "
            ></div>

            <h2 className="text-2xl font-semibold text-white mb-5 relative z-10">
              Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {/* Edit Profile Button */}
              <button
                className="
                  w-full py-3 text-xl font-bold 
                  rounded-xl shadow-lg hover:shadow-2xl 
                  bg-gradient-to-r from-[#FFD266] to-[#FFB347]
                  hover:from-[#FFB347] hover:to-[#FF9A3D]
                  text-black 
                  transition-all duration-500 
                  transform hover:scale-[1.07] active:scale-[0.94]
                  animate__animated animate__pulse animate__slow animate__repeat-2
                "
              >
                ✨ Edit Profile
              </button>

              {/* Logout Button */}
              <button
                className="
                  w-full py-3 text-xl font-bold 
                  rounded-xl shadow-lg hover:shadow-2xl 
                  bg-gradient-to-r from-[#FF616D] to-[#D70040]
                  hover:from-[#D70040] hover:to-[#B40034]
                  text-white 
                  transition-all duration-500 
                  transform hover:scale-[1.07] active:scale-[0.94]
                  animate__animated animate__pulse animate__slow animate__repeat-2
                "
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
