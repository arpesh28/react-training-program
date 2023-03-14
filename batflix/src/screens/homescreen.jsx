import React, { useState, useEffect } from "react";

import axios from "axios";

//  Components
import MovieCard from "../components/movieCard";

export default function Homescreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie?api_key=c84e3d4a9b983db2f509861514607f6f",
    }).then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container">
      <h2>Movies</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="row gx-5 gy-5">
          {movies.map((item, index) => (
            <MovieCard item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
