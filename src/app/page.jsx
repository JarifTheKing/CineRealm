"use client";
import HeroBanner from "@/Components/banner";
import FeaturedMovies from "@/Components/featuredMovies";
import TopMovies from "@/Components/topMovies";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-white">
      {/* HERO SECTION */}
      <div className="animate-[fadeIn_1s_ease]">
        <HeroBanner></HeroBanner>
      </div>

      {/* FEATURED MOVIES SECTION*/}
      <div className="animate-[fadeInUp_1.1s_ease]">
        <FeaturedMovies></FeaturedMovies>
      </div>

      {/* COMMUNITY SECTION (NEW) */}
      <section className="w-full mt-14 mb-16">
        <div
          className="
            bg-[#0b0f19] rounded-3xl p-10 md:p-14 
            border border-white/10 shadow-2xl relative overflow-hidden
            animate-[fadeInUp_1.3s_ease]
          "
        >
          {/* Background Glow */}
          <div className="absolute w-[300px] h-[300px] bg-red-500/20 blur-[150px] rounded-full -top-10 left-10"></div>
          <div className="absolute w-[260px] h-[260px] bg-green-500/20 blur-[150px] rounded-full bottom-0 right-0"></div>

          {/* Title */}
          <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide animate-[fadeIn_1s_ease]">
            Join Our Community & Watch Live TV
          </h2>
          <p className="text-center text-gray-300 max-w-xl mx-auto mb-8 animate-[fadeInUp_1.1s_ease]">
            Connect with us and enjoy unlimited entertainment
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-3 animate-[fadeInUp_1.2s_ease]">
            {/* Join Telegram */}
            <a
              href="https://web.telegram.org/k/"
              target="_blank"
              className="
                bg-blue-600 hover:bg-blue-700 transition duration-300
                text-white font-semibold px-6 py-3 rounded-xl 
                shadow-lg shadow-blue-700/30 flex items-center gap-2 justify-center
                hover:scale-[1.05] active:scale-[0.97]
              "
            >
              <span className="text-xl">📨</span> Join Telegram
            </a>

            {/* Movie Request */}
            <a
              href="#"
              className="
                bg-green-600 hover:bg-green-700 transition duration-300
                text-white font-semibold px-6 py-3 rounded-xl 
                shadow-lg shadow-green-700/30 flex items-center gap-2 justify-center
                hover:scale-[1.05] active:scale-[0.97]
              "
            >
              ✨ Movie Request
            </a>

            {/* Watch Live TV */}
            <a
              href="#"
              className="
                bg-red-600 hover:bg-red-700 transition duration-300
                text-white font-semibold px-6 py-3 rounded-xl 
                shadow-lg shadow-red-700/30 flex items-center gap-2 justify-center
                hover:scale-[1.05] active:scale-[0.97]
              "
            >
              ▶️ Watch Live TV
            </a>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8 animate-[fadeIn_1.4s_ease]">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* CATEGORIES Section */}
      <section className="p-6 md:p-10 bg-gray-950/60 rounded-3xl animate-[fadeInUp_1.2s_ease]">
        <h2 className="text-3xl font-bold mb-6 animate-[fadeIn_1s_ease]">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Bollywood */}
          <Link
            href="/bollywood"
            className="relative p-8 rounded-xl text-center transition 
             bg-[url('https://res.cloudinary.com/dq6ahnk8w/image/upload/v1764066264/bollywood2_ck0muo.jpg')]
             bg-cover bg-center border border-red-500/30 
             hover:bg-red-500/30 hover:bg-blend-overlay
             flex flex-col justify-center items-center overflow-hidden
             animate-[fadeInUp_0.8s_ease] hover:scale-[1.04] duration-300"
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 p-4 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Bollywood</h3>
              <p className="text-gray-300">Indian Cinema</p>
            </div>
          </Link>

          {/* Hollywood */}
          <Link
            href="/hollywood"
            className="relative p-8 rounded-xl text-center transition 
             bg-[url('https://res.cloudinary.com/dq6ahnk8w/image/upload/v1764066254/hollywood_sp3nve.jpg')]
             bg-cover bg-center border border-blue-500/30 
             hover:bg-blue-500/30 hover:bg-blend-overlay
             flex flex-col justify-center items-center overflow-hidden
             animate-[fadeInUp_0.9s_ease] hover:scale-[1.04] duration-300"
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 p-4 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Hollywood</h3>
              <p className="text-gray-300">USA & UK Movies</p>
            </div>
          </Link>

          {/* Foreign */}
          <Link
            href="/foreign"
            className="relative p-8 rounded-xl text-center transition
             bg-[url('https://res.cloudinary.com/dq6ahnk8w/image/upload/v1764066762/foreign_jinpvw.png')]
             bg-cover bg-center border border-green-500/30
             hover:bg-green-500/30 hover:bg-blend-overlay
             flex flex-col justify-center items-center overflow-hidden
             animate-[fadeInUp_1s_ease] hover:scale-[1.04] duration-300"
          >
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="relative z-10 p-4 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Foreign</h3>
              <p className="text-gray-300">Worldwide Cinema</p>
            </div>
          </Link>
        </div>
      </section>

      {/* TOP RATED MOVIES */}
      <div className="animate-[fadeIn_1.3s_ease]">
        <TopMovies></TopMovies>
      </div>

      {/* TESTIMONIALS */}
      <section className="p-6 md:p-10 bg-gray-950/60 rounded-3xl animate-[fadeInUp_1.4s_ease]">
        <h2 className="text-3xl font-bold mb-6">What Users Say</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              text: "CineRealm has become my go-to place. I love how clean the UI is and the ratings help me pick movies fast!",
              user: "Aarav S.",
            },
            {
              text: "The movie details are so accurate and well-arranged. I discovered so many new films thanks to this site.",
              user: "Maya R.",
            },
            {
              text: "Fast, modern, and super easy to use. Honestly one of the best movie platforms I've used recently.",
              user: "Jonathan P.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#24243e] via-[#302b63] to-[#0f0c29] p-6 rounded-xl shadow-lg 
        hover:shadow-2xl hover:scale-[1.05] transition-all duration-300 text-white border border-white/10 
        min-h-[180px] flex flex-col justify-between
        animate-[fadeInUp_0.8s_ease]"
              style={{ animationDelay: `${idx * 0.25}s` }}
            >
              <p className="italic opacity-90">{item.text}</p>
              <h4 className="mt-4 font-semibold text-sm opacity-95">
                – {item.user}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
