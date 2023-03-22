import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

//  Components
import StoryCard from "../components/storyCard";

export default function StoryLists() {
  const navigate = useNavigate();
  // States
  const [stories, setStories] = useState([]);

  // UseEffect
  useEffect(() => {
    getAllStories();
  }, []);

  const getAllStories = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}stories?populate=*`,
    }).then((response) => {
      setStories(response.data.data);
    });
  };

  const deleteStoryFromState = (id) => {
    const newStories = structuredClone(stories);
    let deleteInd = "";
    newStories.forEach((item, index) => {
      if (item.id === id) deleteInd = index;
    });
    newStories.splice(deleteInd, 1);
    setStories(newStories);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between">
        <h2>All Stories</h2>
        <div>
          {localStorage.getItem("jwt") ? (
            <button
              className="btn btn-primary"
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
          <FontAwesomeIcon
            icon={faPowerOff}
            className="ml-3 hover"
            onClick={(e) => {
              localStorage.clear();
              navigate("/login");
            }}
          />
        </div>
      </div>
      <div className="row mt-5 gy-5">
        {stories.map((story, index) => (
          <StoryCard
            story={story}
            key={story.id}
            deleteStoryFromState={deleteStoryFromState}
          />
        ))}
      </div>
    </div>
  );
}
