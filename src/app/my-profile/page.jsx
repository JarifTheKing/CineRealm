"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/Components/privetRoute";

export default function MyProfile() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const axiosSecure = useAxios();

  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users?email=${user.email}`).then((res) => {
        setDbUser(res.data[0]);
      });
    }
  }, [user]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen rounded-3xl flex items-center justify-center px-4 py-10 relative overflow-hidden">
        {/* 🔥 New Animated Aurora Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1f] via-[#1a1446] to-[#230b37] opacity-95 animate-[aurora_14s_linear_infinite]"></div>

        {/* 💎 Floating RGB Lights */}
        <div className="absolute w-[700px] h-[700px] bg-pink-300/20 rounded-full blur-[250px] -top-40 -left-32 animate-[pulse_6s_infinite]" />
        <div className="absolute w-[650px] h-[650px] bg-purple-500/20 rounded-full blur-[250px] bottom-0 -right-20 animate-[pulse_7s_infinite]" />
        <div className="absolute w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-[200px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-[pulse_9s_infinite]" />

        {/* ✨ Floating Particles */}
        <div className="absolute inset-0 pointer-events-none animate-[floatParticles_15s_linear_infinite] opacity-40 bg-[url('/particles.svg')] mix-blend-screen"></div>

        {/* MAIN GLASS CARD */}
        <div
          className={`
            relative z-10 w-full max-w-3xl p-10 rounded-3xl
            bg-white/10 backdrop-blur-3xl
            border border-white/20 shadow-[0_0_80px_-20px_rgba(255,255,255,0.65)]
            hover:shadow-[0_0_120px_-10px_rgba(255,255,255,0.85)]
            transition-all duration-700
            animate-[fadeInUp_0.8s_ease-out]
            before:absolute before:inset-0 before:rounded-3xl
            before:bg-gradient-to-r before:from-pink-500/10 before:via-purple-500/10 before:to-blue-500/10
            before:opacity-0 hover:before:opacity-100 before:blur-2xl before:transition-all before:duration-700
          `}
        >
          {/* HEADER */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative group">
              <div
                className={`
                  w-36 h-36 rounded-full overflow-hidden border-4 border-cyan-400
                  shadow-[0_0_25px_rgba(0,255,255,0.5)]
                  group-hover:scale-105 transition-all duration-700
                `}
              >
                <img
                  src={
                    dbUser?.photoURL ||
                    user?.photoURL ||
                    "https://i.ibb.co/BcM5Jx3/default-avatar.png"
                  }
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Neon Halo */}
              <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-40 group-hover:opacity-80 transition-all duration-700 animate-pulse"></div>
            </div>

            <h1 className="text-4xl font-extrabold text-white mt-6 tracking-wider drop-shadow-2xl">
              {dbUser?.fullName || user?.displayName || "My Profile"}
            </h1>
            <p className="text-white/70">Your personal account dashboard</p>
          </div>

          {/* INFO BOXES */}
          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-500">
              <h2 className="text-2xl font-semibold text-white mb-2">
                About Me
              </h2>
              <p className="text-white/70">
                Welcome, {dbUser?.fullName || user?.displayName || "User"}!
                Customize your profile and manage your preferences.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-500">
              <h2 className="text-2xl font-semibold text-white mb-3">
                Account Details
              </h2>

              <ul className="text-white/80 space-y-2">
                <li>
                  <span className="font-semibold text-white">Full Name:</span>{" "}
                  {dbUser?.fullName || user?.displayName || "Not Provided"}
                </li>
                <li>
                  <span className="font-semibold text-white">Email:</span>{" "}
                  {user?.email || "Not Provided"}
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Favorite Genres:
                  </span>{" "}
                  {dbUser?.favoriteGenres || "Not Provided"}
                </li>
              </ul>
            </div>

            {/* ACTION BUTTONS */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-3xl opacity-50 animate-[pulse_5s_infinite]" />

              <h2 className="text-2xl font-semibold text-white mb-5 relative z-10">
                Actions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <Link href="/edit-profile">
                  <button className="w-full py-3 text-xl font-bold rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-black shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.06]">
                    ✨ Edit Profile
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-xl font-bold rounded-xl bg-gradient-to-r from-red-400 to-red-700 hover:from-red-300 hover:to-red-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.06]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes aurora {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
        @keyframes floatParticles {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1000px 1000px;
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PrivateRoute>
  );
}
