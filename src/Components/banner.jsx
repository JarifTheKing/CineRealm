"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroBanner() {
  const axiosSecure = useAxios();
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/allMovies")
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        setSlides(sorted.slice(0, 6));
      })
      .catch((err) => console.error("Banner Load Error:", err));
  }, [axiosSecure]);

  const fallbackImage =
    "https://res.cloudinary.com/dq6ahnk8w/image/upload/v1764065414/moviesss_leu8fc.jpg";

  return (
    <div className="relative">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        speed={800}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[80vh] rounded-xl overflow-hidden"
      >
        {slides.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div
              style={{
                "--bg-url": `url(${movie.image || fallbackImage})`,
              }}
              className="
                h-full w-full
                bg-cover bg-center
                flex items-center justify-center relative
                bg-[image:var(--bg-url)]
              "
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

              {/* Content */}
              <div className="relative z-10 text-center px-6 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                  {movie.title}
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow">
                  {movie.story_line || "Watch the latest blockbuster movies!"}
                </p>

                <a href={`/all-movies/${movie._id}`}>
                  <button className="btn btn-warning text-black font-semibold px-6 py-2 text-lg rounded-lg shadow-md hover:scale-105 transition-all">
                    Watch Now
                  </button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Custom Styles */}
      <style>
        {`
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #ffffff;
            opacity: 0.5;
          }
          .swiper-pagination-bullet-active {
            background: #fbbf24;
            opacity: 1;
            width: 12px;
            height: 12px;
          }
          .swiper-button-next,
          .swiper-button-prev {
            color: #fff;
            opacity: 0.8;
            transition: 0.3s;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            opacity: 1;
            scale: 1.1;
          }
        `}
      </style>
    </div>
  );
}
