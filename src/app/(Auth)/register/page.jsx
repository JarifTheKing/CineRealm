"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

// Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth } from "@/Firebase/firebase.config";
import useAxios from "@/hooks/useAxios";

export default function Register() {
  const { registerWithEmail, signInWithGoogle, setUser } = useAuth();
  const router = useRouter();
  const axiosSecure = useAxios();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // MAIN SUBMIT
  const onSubmit = async (data) => {
    const { email, password, username, photo } = data;

    try {
      // 1) Create Firebase User
      const res = await registerWithEmail(email, password);
      const currentUser = res.user;

      let photoURL = "";

      // 2) Upload Profile Image
      if (photo && photo[0]) {
        const storage = getStorage();
        const imgRef = ref(storage, `users/${currentUser.uid}/profile.jpg`);

        await uploadBytes(imgRef, photo[0]);
        photoURL = await getDownloadURL(imgRef);
      }

      // 3) Update Firebase Profile
      await updateProfile(currentUser, {
        displayName: username,
        photoURL: photoURL || null,
      });

      await currentUser.reload();

      // 4) Save to MongoDB
      const newUser = {
        username,
        email,
        photoURL: photoURL || "",
      };

      await axiosSecure.post("/users", newUser);

      // 5) Update Context
      setUser(auth.currentUser);

      toast.success("Account created successfully!");

      // 6) Redirect
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // GOOGLE LOGIN
  const handleGoogle = () => {
    signInWithGoogle()
      .then(async (res) => {
        const gUser = res.user;

        const newUser = {
          username: gUser.displayName,
          email: gUser.email,
          photoURL: gUser.photoURL,
        };

        await axiosSecure.post("/users", newUser).catch(() => {});
        setUser(gUser);

        toast.success("Logged in with Google!");
        router.push("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen rounded-3xl flex items-center justify-center bg-gradient-to-br from-purple-800 via-fuchsia-700 to-rose-600 p-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20 animate-fadeIn">
        <h2 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow-lg mb-6">
          Create Account
        </h2>
        <p className="text-center text-white/80 mb-8">
          Join{" "}
          <span className="font-bold text-yellow-300 logo text-xl">
            CineRealm
          </span>{" "}
          and explore endless movies!
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <label className="form-control w-full">
            <span className="label-text text-white/90 font-semibold">
              Username
            </span>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30"
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
              className="file-input file-input-bordered w-full bg-amber-400/80 text-white border-white/30"
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
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30"
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
              })}
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30"
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
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type="password"
              placeholder="Re-enter password"
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/50 border-white/30"
            />
            {errors.confirmPassword && (
              <p className="text-red-300 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>

          <button className="btn w-full bg-yellow-400 text-black font-bold border-none hover:bg-yellow-300 transition-all mt-4 shadow-lg">
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
          className="btn w-full border-0 bg-white text-black font-semibold hover:bg-gray-200 shadow-lg"
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
