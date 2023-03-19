import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import axios from "axios";

export default function MovieDetails() {
  const { state } = useLocation();
  console.log("location:", useLocation());
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${state.id}?api_key=c84e3d4a9b983db2f509861514607f6f`,
    }).then((response) => {
      setMovie(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container">
      {loading ? (
        <h3>Loading...</h3>
      ) : movie ? (
        <div className="row">
          <div className="col-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
          </div>
          <div className="col-6">
            <h2>{movie.original_title}</h2>
            <h4>{movie.tagline}</h4>
            <p>{movie.overview}</p>
            <p>{movie.vote_average}</p>
            <ul>
              {movie.genres?.map((genre, index) => (
                <li>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <h2>No movie</h2>
      )}
    </div>
  );
}
