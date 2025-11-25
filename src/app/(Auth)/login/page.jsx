"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const { logInWithEmail, signInWithGoogle, setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ⭐ Email/Password Login
  const onSubmit = async (data) => {
    const { email, password } = data;

    const res = await logInWithEmail(email, password)
      .then((response) => {
        setUser(response.user);
        toast.success("Logged in successfully!");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // ⭐ Google Login
  const handleGoogle = async () => {
    await signInWithGoogle()
      .then((res) => {
        setUser(res.user);
        toast.success("Logged in with Google!");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen py-18 rounded-3xl flex items-center justify-center px-4 relative overflow-hidden bg-black">
      {/* Background Blur */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/40 rounded-full blur-[160px] -top-40 -left-40"></div>

      <div className="absolute w-[500px] h-[500px] bg-fuchsia-600/40 rounded-full blur-[160px] -bottom-40 -right-40"></div>
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20 animate-fadeIn">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow-lg mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-white/80 mb-8">
          Login to your{" "}
          <span className="text-yellow-300 text-xl font-bold logo">
            CineRealm
          </span>{" "}
          account
        </p>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Email
            </span>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className="input input-bordered mb-4 mt-2 w-full bg-white/20 text-white placeholder-white/50 border-white/30 focus:border-yellow-300"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </label>

          {/* Password */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Password
            </span>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter password"
              className="input input-bordered mb-4 mt-2 w-full bg-white/20 text-white placeholder-white/50 border-white/30 focus:border-yellow-300"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </label>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/reset-password"
              className="text-yellow-300 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="btn w-full bg-yellow-400 text-black font-bold border-none hover:bg-yellow-300 transition-all mt-2 shadow-lg hover:shadow-yellow-500/40">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-white/70 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="btn border-0 w-full bg-white text-black font-semibold hover:bg-gray-200 shadow-lg"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        {/* Footer */}
        <p className="text-center text-white/80 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
