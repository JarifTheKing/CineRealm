"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logOut } = useAuth();

  // ACTIVE LINK
  const isActive = (path) => {
    if (!pathname) return "";
    return pathname === path
      ? "bg-white/20 border-b-2 border-red-500 px-3 py-1 rounded-md font-bold"
      : "hover:bg-white/10 px-3 py-1 rounded-md";
  };

  // LOGOUT
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully!"))
      .catch(() => toast.error("Logout failed!"));
  };

  return (
    <div className="navbar bg-fuchsia-900 rounded-full px-4 sm:px-5 py-2 mb-10 mt-2 shadow-md text-white max-w-full">
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE MENU */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-fuchsia-800 text-white rounded-box mt-3 w-52 p-3 shadow-lg z-50"
          >
            <li>
              <Link href="/" className={isActive("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/all-movies" className={isActive("/all-movies")}>
                All Movies
              </Link>
            </li>
            <li>
              <Link href="/bollywood" className={isActive("/bollywood")}>
                Bollywood
              </Link>
            </li>
            <li>
              <Link href="/hollywood" className={isActive("/hollywood")}>
                Hollywood
              </Link>
            </li>
            <li>
              <Link href="/foreign" className={isActive("/foreign")}>
                Foreign
              </Link>
            </li>
            <li>
              <Link href="/add-movies" className={isActive("/add-movies")}>
                Add a Movie
              </Link>
            </li>
            <li>
              <Link
                href="/manage-movies"
                className={isActive("/manage-movies")}
              >
                My Added Movies
              </Link>
            </li>
          </ul>
        </div>

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <img
            width="36"
            className="sm:w-10"
            src="https://img.icons8.com/doodle/48/camcorder-pro.png"
          />
          <span className="text-2xl sm:text-3xl font-bold tracking-wide">
            CineRealm
          </span>
        </Link>
      </div>

      {/* CENTER MENU (DESKTOP) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-md font-semibold">
          <li>
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/all-movies" className={isActive("/all-movies")}>
              All Movies
            </Link>
          </li>
          <li>
            <Link href="/bollywood" className={isActive("/bollywood")}>
              Bollywood
            </Link>
          </li>
          <li>
            <Link href="/hollywood" className={isActive("/hollywood")}>
              Hollywood
            </Link>
          </li>
          <li>
            <Link href="/foreign" className={isActive("/foreign")}>
              Foreign
            </Link>
          </li>
          <li>
            <Link href="/add-movies" className={isActive("/add-movies")}>
              Add a Movie
            </Link>
          </li>
          <li>
            <Link href="/manage-movies" className={isActive("/manage-movies")}>
              My Added Movies
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-orange-500">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://img.icons8.com/3d-fluent/100/user-2.png"
                  }
                  alt="User"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-fuchsia-800 text-white rounded-box w-48 mt-3 shadow-lg"
            >
              <li>
                <Link href="/my-profile" className={isActive("/my-profile")}>
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login">
              <button className="btn btn-warning text-black font-semibold">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="btn btn-warning text-black font-semibold">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
