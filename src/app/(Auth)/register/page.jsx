"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";

export default function Register() {
  const { registerWithEmail, updateUserProfile, setUser, signInWithGoogle } =
    useAuth();
  const router = useRouter();
  const axiosSecure = useAxios();

  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const onSubmit = async (data) => {
    // ✅ Password verification added here
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const { username, email, password, photo } = data;

    try {
      // Upload to Firebase
      const userCredential = await registerWithEmail(email, password);

      let photoURL = preview;

      await updateUserProfile(username, photoURL);

      setUser({ ...userCredential.user, displayName: username, photoURL });

      await axiosSecure.post("/users", {
        name: username,
        email,
        photoURL,
      });

      toast.success("Account created!");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
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

      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)] rounded-3xl p-8 ">
        <h2 className="text-4xl font-extrabold text-center text-white tracking-wide mb-4">
          Create Account
        </h2>
        <p className="text-center text-white/70 mb-8">
          Join{" "}
          <span className="text-yellow-300 font-bold logo text-xl">
            CineRealm
          </span>{" "}
          Today!
        </p>

        {/* ---------- FORM ---------- */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <label className="form-control w-full ">
            <span className="label-text text-white/90 font-semibold">
              Username
            </span>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30 mb-4 mt-2"
            />
            {errors.username && (
              <p className="text-red-300 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </label>

          {/* Image Upload */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Profile Image
            </span>
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              onChange={handleImageChange}
              className="file-input mb-4 mt-2 file-input-bordered w-full bg-amber-400/80 text-white border-white/30"
            />
            {preview && (
              <img
                src={preview}
                className="w-20 h-20 rounded-full mt-3 border-2 border-white shadow-md object-cover"
                alt="preview"
              />
            )}
          </label>

          {/* Email */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Email
            </span>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered mb-4 mt-2 w-full bg-white/20 text-white placeholder-white/50 border-white/30"
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
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                  message:
                    "Password must include uppercase, lowercase, number, and symbol",
                },
              })}
              type="password"
              placeholder="Enter password"
              className="input input-bordered mb-4 mt-2 w-full bg-white/20 text-white placeholder-white/50 border-white/30"
            />
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </label>

          {/* Confirm Password */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Confirm Password
            </span>
            <input
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (v) =>
                  v === watch("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="Re-enter password"
              className="input input-bordered mb-4 mt-2 w-full bg-white/20 text-white placeholder-white/50 border-white/30"
            />
            {errors.confirmPassword && (
              <p className="text-red-300 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>

          <button className="btn my-4 w-full bg-yellow-400 text-black font-bold border-none hover:bg-yellow-300 shadow-lg">
            Create Account
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

        <p className="text-center text-white/80 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
