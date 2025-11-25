// "use client";
// import React, { useEffect, useState } from "react";
// import useAxios from "@/hooks/useAxios";

// export default function AllMovies() {
//   const axiosSecure = useAxios();
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     axiosSecure.get("/allMovies").then((res) => {
//       setMovies(res.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Movies</h1>
//       {movies.map((movie) => (
//         <p key={movie._id}>{movie.title}</p>
//       ))}
//     </div>
//   );
// }
