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
