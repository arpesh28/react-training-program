import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//  Components
import StoryCard from "../components/storyCard";

export default function StoryLists() {
  const navigate = useNavigate();
  // States
  const [stories, setStories] = useState([]);

  // UseEffect
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}stories?populate=*`,
    }).then((response) => {
      setStories(response.data.data);
    });
  }, []);
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between">
        <h2>All Stories</h2>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            navigate("/add-story");
          }}
        >
          Add Story
        </button>
      </div>
      <div className="row mt-5 gy-5">
        {stories.map((story, index) => (
          <StoryCard story={story} key={story.id} />
        ))}
      </div>
    </div>
  );
}
