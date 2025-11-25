export default async function AllMovieDetails({ params }) {
  const { allMovieDetails } = params;

  // Load your movies.json
  // const movies = await fetch("http://localhost:3000/movies.json").then((res) =>
  //   res.json()
  // );

  // Find the selected movie
  // const movie = movies.find(
  //   (m) => m.title.toLowerCase() === allMovieDetails.toLowerCase()
  // );

  // if (!movie) {
  //   return <p className="text-white text-center mt-10">Movie not found</p>;
  // }

  return (
    <div className="text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Details:</h1>

      {/* <img
        src={allMovieDetails.image}
        alt={allMovieDetails.title}
        className="w-full max-w-xl rounded-lg mb-5"
      />

      <p>
        <strong>Genre:</strong> {allMovieDetails.genre}
      </p>
      <p>
        <strong>IMDB Rating:</strong> ⭐ {allMovieDetails.imdb_rating}
      </p>
      <p>
        <strong>Release Date:</strong> {allMovieDetails.release_date}
      </p>
      <p>
        <strong>Language:</strong> {allMovieDetails.language}
      </p>
      <p>
        <strong>Description:</strong> {allMovieDetails.description}
      </p> */}
    </div>
  );
}
