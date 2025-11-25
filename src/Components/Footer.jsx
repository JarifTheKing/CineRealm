"use client";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-fuchsia-900 text-neutral-content px-6 py-10 mt-10 rounded-t-3xl">
      <div className="container mx-auto grid gap-10 md:grid-cols-3 lg:grid-cols-4">
        {/* Brand Section */}
        <div className="flex flex-col items-start">
          <img
            src="https://res.cloudinary.com/dq6ahnk8w/image/upload/v1764097979/Logo_-_Copy_gylwao.png"
            alt="Logo"
            className="rounded-full w-20 h-20 mb-2"
          />
          {/* <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mb-3"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg> */}

          <p className="text-sm leading-6 opacity-80 max-w-xs">
            <span className="logo font-semibold text-xl text-white">
              CineRealm
            </span>{" "}
            — Your trusted source for movies, entertainment & reviews.
            <br />© {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="footer-title">Quick Links</h6>
          <ul className="flex flex-col gap-2 mt-3">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/all-movies" className="hover:underline">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h6 className="footer-title">Categories</h6>
          <ul className="flex flex-col gap-2 mt-3">
            <li>
              <Link href="/top-movies" className="hover:underline">
                Top Movies
              </Link>
            </li>
            <li>
              <Link href="/latest" className="hover:underline">
                Latest Releases
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:underline">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/trending" className="hover:underline">
                Trending
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h6 className="footer-title">Follow Us</h6>
          <div className="flex gap-4 mt-3">
            <Link href="#">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/facebook-new.png"
                alt="facebook-new"
              />
            </Link>
            <Link href="#">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/github.png"
                alt="github"
              />
            </Link>
            <Link href="#">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/youtube-play.png"
                alt="youtube-play"
              />
            </Link>
            <Link href="#">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/linkedin.png"
                alt="linkedin"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
