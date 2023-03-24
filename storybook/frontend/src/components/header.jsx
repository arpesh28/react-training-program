import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({ page }) {
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}users/me?populate=*`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    }).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between header">
      <h2>{page}</h2>
      <nav className="d-flex justify-content-between">
        <div className="nav-wrapper">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
        </div>
        <div>
          {localStorage.getItem("jwt") ? (
            <button
              className="btn btn-primary mx-4"
              onClick={(e) => {
                e.preventDefault();
                navigate("/add-story");
              }}
            >
              Add Story
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </button>
          )}{" "}
          {localStorage.getItem("jwt") && (
            <FontAwesomeIcon
              icon={faPowerOff}
              className="ml-3 hover"
              onClick={(e) => {
                localStorage.clear();
                navigate("/login");
              }}
            />
          )}
        </div>
      </nav>
    </div>
  );
}
