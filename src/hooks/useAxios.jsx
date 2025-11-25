"use client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: false,
});

export default function useAxios() {
  return axiosInstance;
}
