import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="col-4 gx-5 movie-card hover"
      onClick={() => {
        navigate("/movie-details", { state: { id: item.id } });
      }}
    >
      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
      <h3>{item.original_title}</h3>
    </div>
  );
}
