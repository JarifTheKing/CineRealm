"use client";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen rounded-3xl relative overflow-hidden flex items-center justify-center px-6 py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />

      {/* Floating Aurora Lights */}
      <div className="absolute w-[700px] h-[700px] bg-fuchsia-500/20 blur-[220px] rounded-full  -top-48 -left-20 animate-pulseCustom" />
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[220px] rounded-full -bottom-32 right-0 animate-pulseCustom" />

      {/* Main Content Box */}
      <div
        className="
        relative z-10 max-w-5xl mx-auto text-center
        bg-white/10 backdrop-blur-2xl border border-white/20
        rounded-3xl shadow-[0_0_100px_-20px_rgba(255,255,255,0.6)]
        p-10 md:p-16 
        animate-fadeInUp

        /* NEW gradient + glass improvements */
        bg-gradient-to-br from-white/10 via-white/5 to-white/0
        hover:bg-gradient-to-br hover:from-white/20 hover:via-white/10 hover:to-white/0
        transition-all duration-700
        hover:shadow-[0_0_140px_-10px_rgba(255,80,255,0.5)]
        "
      >
        <Link href="https://github.com/JarifTheKing" target="_blank">
          <img
            src="/Okew.jpg"
            alt=""
            className="rounded-full w-50 h-50 mx-auto object-cover mb-6 shadow-xl 
            bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-[3px]"
          />
        </Link>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-wide drop-shadow-xl">
          About <span className="text-blue-300">Us</span>
        </h1>

        <p className="text-white/70 mt-4 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A creative team dedicated to crafting a next-generation movie
          experience — stylish, fast, and built for real entertainment lovers.
        </p>

        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-6 rounded-full shadow-xl" />

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {[
            {
              title: "🎬 Our Mission",
              text: "To build the most engaging, visually stunning movie platform with smooth animations and intelligent search.",
              glowFrom: "from-pink-500/10 to-purple-500/10",
            },
            {
              title: "🚀 Our Vision",
              text: "To redefine how audiences explore movies — blending modern UI, speed, and personalized recommendations.",
              glowFrom: "from-indigo-500/10 to-blue-500/10",
            },
            {
              title: "💡 Our Values",
              text: "Creativity, simplicity, performance — every detail crafted with purpose and passion.",
              glowFrom: "from-purple-500/10 to-pink-500/10",
            },
            {
              title: "👨‍💻 The Team",
              text: "A passionate development team skilled in Next.js, UI design, and animation — building digital experiences with heart.",
              glowFrom: "from-blue-500/10 to-cyan-500/10",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="
                group p-7 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl
                hover:bg-white/20 transition-all duration-500 hover:-translate-y-2
                relative overflow-hidden shadow-lg hover:shadow-2xl
                animate-fadeIn

                /* NEW colorful gradient border effect */
                before:absolute before:inset-0 before:rounded-2xl
                before:bg-gradient-to-r before:from-fuchsia-400/20 before:to-cyan-400/20
                before:opacity-0 group-hover:before:opacity-40 before:blur-xl
                before:transition-all before:duration-700
              "
            >
              {/* Hover Glow Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${card.glowFrom} opacity-0 
                group-hover:opacity-40 blur-2xl transition-all duration-500`}
              ></div>

              <h2 className="text-3xl font-semibold text-white mb-3 drop-shadow-md">
                {card.title}
              </h2>
              <p className="text-white/70 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Your Movie Platform{" "}
            <span className="text-amber-500 font-semibold">CINEREALM</span> —
            Crafted with ❤️, creativity, and Next.js
          </p>

          <Link href="https://github.com/JarifTheKing" target="_blank">
            <p
              className="
                text-white/70 text-sm mt-3 font-semibold tracking-wide
                transition-all duration-300
                hover:text-fuchsia-300 hover:scale-[1.05]
                relative inline-block cursor-pointer
              "
            >
              By —
              <span
                className="
                  font-extrabold italic text-fuchsia-200
                  bg-gradient-to-r from-fuchsia-300 via-pink-300 to-violet-300
                  bg-clip-text text-transparent
                  drop-shadow-[0_0_10px_rgba(255,150,255,0.4)]
                  animate-pulseCustom
                "
              >
                JARIF MAHFUZ
              </span>
              <span
                className="
                  absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px]
                  bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-all duration-500
                "
              ></span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
