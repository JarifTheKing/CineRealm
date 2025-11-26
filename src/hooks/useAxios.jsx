"use client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cine-realm-server.vercel.app",
  withCredentials: false,
});

export default function useAxios() {
  return axiosInstance;
}
